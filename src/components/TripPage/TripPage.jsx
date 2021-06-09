import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';


function TripPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const trips = useSelector(store => store.trips);



  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS' });

  }, []);

  const setTripDetails = (trip) => {
    dispatch({
      type: 'SET_TRIPS',
      payload: trip
    });


  }
  return (
    <Container>
      <CardGroup className="card text-white bg-primary mb-3" style="max-width: 20rem;">
        {trips.map(trip => {
          return (
            <Card key={trip.id} border="dark">
              <Card.Title >{trip.trip_name}</Card.Title>
              <Card.Text>Travel Dates</Card.Text>
              <Card.Body>{moment(trip.start).format('MMM Do YYYY')} to {moment(trip.end).format('MMM Do YYYY')}</Card.Body>
            </Card>
          );
        })
        }
      </CardGroup>
      <CardGroup>
        <Card border="dark">
          <Card.Title>New Trip</Card.Title>
        </Card>

      </CardGroup>
    </Container>
  )
}




export default TripPage;