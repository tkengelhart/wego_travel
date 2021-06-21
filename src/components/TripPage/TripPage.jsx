import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Image, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
import TripForm from '../TripForm/TripForm';



function TripPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const trips = useSelector(store => store.trips);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS' });
  }, []);

  const setTripDetails = (trip) => {
    console.log('payload', trip);
    dispatch({
      type: 'SET_TRIP_DETAILS',
      payload: trip
    })
    history.push(`/details/${trip.id}`);
  }

  console.log('trips are', trips)
  return (
    <>
      <Container fluid className="trip-cards">


        < h1 > Select your trip</h1>
        <p>Here you can look at the interary for trips you have already created, or start planning your next trip.</p>



        <CardDeck>
          <div className="col-lg">
            <div className="row">
              <CardDeck>
                <Card className="trip-card">
                  <Card.Body>
                    <Button variant="success" className="new-trip" size="lg" title="New Trip" onClick={handleShow}>New Trip</Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body><TripForm /></Modal.Body>
                    </Modal>
                  </Card.Body>
                </Card>
              </CardDeck>

            </div>
          </div>
          {trips.map(trip => {
            return (


              <Card key={trip.id} border="dark" className="trip-card" onClick={() => setTripDetails(trip)}>
                <Card.Title as="h3" className="trip-title">{trip.trip_name}</Card.Title>
                <Card.Subtitle>Travel Dates</Card.Subtitle>
                <Card.Text>{moment(trip.start).format('MMM Do YYYY')} to {moment(trip.end).format('MMM Do YYYY')}</Card.Text>
                <Card.Body className="trip-body">
                </Card.Body>

              </Card>
            );
          })}

        </CardDeck>





      </Container >
    </>
  )
}



export default TripPage;