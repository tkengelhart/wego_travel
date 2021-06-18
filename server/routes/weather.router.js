const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


const router = express.Router();

router.get('/:searchid', (req, res) => { // api/giphy/apple

    let searchParams = (req.params.searchid);

    console.log(searchParams);


    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=$1&appid=api_key=${process.env.WEATHER_API_KEY}
        `).then((response) => {
        console.log(response.data);
        res.send(response.data);
    }).catch(error => {
        console.log('Error on getting API', [itinerary.name]);
        res.sendStatus(500);
    })
});

module.exports = router;