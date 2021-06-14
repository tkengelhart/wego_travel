const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


//GET ROUTES
//initial list of trips
//working
router.get('/trips', (req, res) => {
  const query = `SELECT * FROM "itinerary" ORDER BY "start"`;
  pool.query(query)
    .then((response) => {
      console.log('Available Trips', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error getting trips', error);
    });

});

//GET initial activity list ordered by location - will need to select by location based on selection
//working
router.get('/activity', (req, res) => {
  const query = `SELECT * FROM "activity" ORDER BY "activity_location"`;
  pool.query(query)
    .then((response) => {
      console.log('Available Activities', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error getting activities', error);
    });
});


// update call for trip location after testing
//changed this to pull from store instead
//working
router.get(`/details/:tripId`, (req, res) => {
  let tripId = req.params.tripId;
  console.log('here is the trip id', tripId);
  // console.log('here is the url', `/details/:tripId`);
  const query =
    `SELECT "itinerary_activity"."id" AS "itineraryId", "activity"."id", "date", "activity"."name", "time_of_day", "constraints", "notes" FROM "itinerary_activity"
LEFT JOIN
"activity"
ON 
"activity"."id" = "itinerary_activity"."activity_id"
WHERE "itinerary_activity"."itinerary_id" = $1
ORDER BY "itinerary_activity"."date"`;

  pool.query(query, [tripId])
    .then((response) => {
      console.log('Items in trip', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error in GET request to display trip', error);
      res.sendStatus(500)
    })
});

//PUT ROUTES
//Update activity info, route works

router.put('/edit', (req, res, next) => {
  let activityId = req.body.activityId
  let name = req.body.name;
  let constraints = req.body.constraints;
  let activity_url = req.body.activity_url;
  let activity_location = req.body.activity_location;

  const queryText = `UPDATE "activity" SET "name" = $1, "constraints" = $2, "activity_url"= $3, "activity_location" = $4
 WHERE "activity"."id" = $5`;
  pool.query(queryText, [name, constraints, activity_url, activity_location, activityId])
    .then(response => {
      console.log('Activity Updated', activityId);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Activity could not be added', err);
      res.sendStatus(500);
    });
});

//change activity time of day and date in itinerary
//working
router.put('/activityupdate', (req, res) => {
  let activityTime = req.body.activityTime;
  let activityId = req.body.activityId;
  console.log('req.body is', req.body);
  console.log('here is the activity being edited', activityTime);

  const query = `UPDATE "itinerary_activity" SET "time_of_day" = $2
  WHERE "itinerary_activity"."id" = $1 RETURNING *;`;
  pool.query(query, [activityId, activityTime])
    .then((response) => {
      console.log('Editing this itinerary', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('error is', error);

      res.sendStatus(500)
    })
});


//POST ROUTES
//post new activity
//new activity works
router.post('/add', (req, res, next) => {
  const queryText = `INSERT INTO "activity" ("name", "constraints", "activity_url", "activity_location") 
    VALUES ($1, $2, $3, $4)`;
  pool.query(queryText, [req.body.name, req.body.constraints, req.body.activity_url, req.body.activity_location])
    .then(response => {
      console.log('New Activity added', response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Activity could not be added', err);
      res.sendStatus(500);
    });
});

//update itinerary activity

router.post('/additinerary', (req, res, next) => {
  const queryText = `INSERT INTO "itinerary_activity" ("itinerary_id", "activity_id", "time_of_day", "date", "notes")
  VALUES ($1, $2, $3, $4, $5)`;
  pool.query(queryText, [req.body.itinerary_id, req.body.activity_id, req.body.time_of_day, req.body.date, req.body.notes])
    .then(response => {
      console.log('Added to itinerary', response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Could not be added', err);
      res.sendStatus(500);
    });
});
//post new trip 
//new trip works
router.post('/trip', (req, res, next) => {
  const queryText = `INSERT INTO "itinerary" ("start", "end", "trip_name") 
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [req.body.start, req.body.end, req.body.trip_name])
    .then(response => {
      console.log('New Trip added', response.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Trip could not be added', err);
      res.sendStatus(500);
    });
});


//DELETE ROUTES
//delete activity
//delete activity works
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('the param is', req.params.id);
  const firstQuery = `DELETE FROM "itinerary_activity"
  WHERE "itinerary_activity"."activity_id" = $1;`;

  pool.query(firstQuery, [req.params.id])
    .then(response => {
      console.log('Deleted activity', response.rows);

      const queryText = `DELETE FROM "activity" WHERE "activity"."id" = $1;`;

      pool.query(queryText, [req.params.id])
        .then(response => {
          console.log('Deleted activity', response.rows);
          res.sendStatus(200);
        })
        .catch(err => {
          console.log('Trouble deleting', err);
          res.sendStatus(500);
        })

    }).catch(err => {
      console.log('Trouble deleting', err);
      res.sendStatus(500);
    })
})

module.exports = router;
