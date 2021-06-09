import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useParams } from 'react-router-dom';


function TripPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const trips = useSelector(store => store.trips);
  let params = useParams();

  // let tripId = params.id;
  // let trip = trips.find(trip => trip.id === Number(tripId));
  // console.log(`trip selected:`, trip);


  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS' });

  }, []);

  const setTripDetails = (trip) => {
    console.log('payload', trip);
    dispatch({
      type: 'SET_TRIPS',
      payload: {
        tripId: trip.id
      }
    });
    history.push(`/details/:tripId`);
  }


  return (
    <Container>
      <CardGroup>
        {trips.map(trip => {
          return (
            <Card key={trip.id} border="dark" onClick={() => setTripDetails(trip)}>
              <Card.Body>
                <Card.Title >{trip.trip_name}</Card.Title>
                <Card.Subtitle>Travel Dates</Card.Subtitle>
                <Card.Text>{moment(trip.start).format('MMM Do YYYY')} to {moment(trip.end).format('MMM Do YYYY')}</Card.Text>
              </Card.Body>
            </Card>
          );
        })
        }
      </CardGroup>

      <CardGroup>
        <Card border="dark">
          <Card.Body>
            <Card.Title>New Trip</Card.Title>
          </Card.Body>
        </Card>

      </CardGroup>
    </Container >

  )
}



export default TripPage;