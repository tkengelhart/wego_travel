import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      payload: trip,
    });
    history.push(`/trips/${trip.id}`);
  }

  // const setMovieGenre = (genre) => {
  //   dispatch({
  //     type: 'SET_GENRES',
  //     payload: genre,
  //   });
  // }
  // //trying something from stack overflow
  // const sampleStyle = {
  //   minWidth: "30%",
  //   flexGrow: 0,
  // };



  return (

    <Container>
      <ul>
        {trips.map(trip => {
          return (
            <li key={trip.id} > {trip.trip_name}

            </li>

          )
        })}

      </ul>
    </Container >
  );
}
export default TripPage;