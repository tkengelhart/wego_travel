import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';



function WeatherSearch() {
    const [itinerary, setItinerary] = useState('');
    const dispatch = useDispatch();

    const findCity = useSelector(store => store.itinerary);
    const currentCity = findCity.find(city => city.name === findCity);

    useEffect(() => {
        if (currentcity) {
            console.log('current city is', currentCity);
            axios.get('/api/weather').then((response) => {
                const weather = response.data.data;
                console.log('weather is', weather);
                dispatch({
                    type: 'SET_WEATHER',
                    payload: city.name
                }, [cityFind]);
            })
        }
    })

    return (
        <Container fluid>

            Weather goes here:
            <Card>Testing</Card>
        </Container >
    )
}
export default WeatherSearch;
