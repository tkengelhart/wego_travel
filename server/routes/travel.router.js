const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */

//get trip // update call for trip location after testing
//initial test query `SELECT * FROM itinerary`
router.get('/', (req, res) => {
  const query = `SELECT "date", "activity"."name", "time_of_day", "constraints", "notes" FROM "itinerary_activity"
  LEFT JOIN "activity" ON "activity"."id" = "itinerary_activity"."activity_id" JOIN "itinerary" ON
  "itinerary"."id" = "itinerary_activity"."itinerary_id" WHERE "itinerary"."trip_name" = 'nashville';`;
  pool.query(query)
    .then((response) => {
      console.log('Items in Nashville trip', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error in GET request to display trip', error);
      res.sendStatus(500)
    })
});

//post new activity
router.post('/activity', (req, res, next) => {
  const queryText = `INSERT INTO "activity" ("name", "constraints", "activity_url", "activity_location") 
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool.query(queryText, [req.body.name, req.body.constraints, req.body.activity_url, req.body.activity_location])
    .then(response => {
      console.log('New Activity added', result.rows);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Activity could not be added', err);
      res.sendStatus(500);
    });
});


//post new trip 
router.post('/trip', (req, res, next) => {
  const queryText = `INSERT INTO "itinerary" ("start", "end", "trip_name") 
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [req.body.start, req.body.end, req.body.trip_name])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Trip could not be added', err);
      res.sendStatus(500);
    });
});

//delete activity
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('the body is', req.body);
  const queryText = `DELETE FROM "activity" WHERE "activity"."id" = $1`;
  pool.query(queryText, [req.params.id])
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    }
    );
});
//update activity day and time of day
router.put('/:itinerary_activity.id', (req, res) => {
  console.log(req.params);
  const itinId = req.params.itinerary_activity.id;
  const queryText = `UPDATE "itinerary_activity" SET "date" = '', "time_of_day" = '' 
  WHERE "itinerary_activity"."id" = $1`;
  pool.query(queryText, [itinId])
    .then(() => {
      res.sendStatus(202); //202 accepted
    }).catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});


module.exports = router;
