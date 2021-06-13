const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET initial list of trips

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

router.get(`/details/:tripId`, (req, res) => {
  let tripId = req.params.tripId;
  console.log('here is the trip id', tripId);
  // console.log('here is the url', `/details/:tripId`);
  const query =
    `SELECT "activity"."id", "date", "activity"."name", "time_of_day", "constraints", "notes" FROM "itinerary_activity"
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

//post new activity
//new activity works
router.post('/activity', (req, res, next) => {
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

//update activity day and time of day
// router.put('/edit/:itinId', (req, res) => {
//   console.log(req.params);
//   const itinId = req.params.id;
//   const queryText = `UPDATE "itinerary_activity" SET "date" = $1, "time_of_day" = $2 
//   WHERE "itinerary_activity"."id" = $3`;
//   pool.query(queryText, [date, tod, itinId])
//     .then(() => {
//       res.sendStatus(202); //202 accepted
//     }).catch((err) => {
//       console.log(`Error making query ${queryText}`, err);
//       res.sendStatus(500);
//     });
// });


module.exports = router;
