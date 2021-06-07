const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/travel', (req, res) => {
  const queryText = `SELECT "date", "activity"."name", "time_of_day", "constraints", "notes" FROM "itinerary_activity"
LEFT JOIN "activity" ON "activity"."id" = "itinerary_activity"."activity_id" JOIN "itinerary" ON
"itinerary"."id" = "itinerary_activity"."itinerary_id" WHERE "itinerary"."trip_name" = 'nashville';`;
  pool.query(queryText).then((response) => {
    console.log('Items in Nashville trip', response.rows);
    res.send(response.rows);
  }).catch((error) => {
    console.log('Error in GET request to display trip', error);
  })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/activity', (req, res, next) => {
  const queryText = `INSERT INTO "activity" ("name", "constraints", "activity_url", "activity_location") 
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [name, constraints, activity_url, activity_location])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Activity could not be added', err);
      res.sendStatus(500);
    });
});

router.post('/trip', (req, res, next) => {
  const queryText = `INSERT INTO "itinerary" ("start", "end", "trip_name") 
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [start, end, trip_name])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Trip could not be added', err);
      res.sendStatus(500);
    });
});






/**
 * POST route template
 */
router.post('/activity', (req, res) => {
  // POST route code here
});

module.exports = router;
