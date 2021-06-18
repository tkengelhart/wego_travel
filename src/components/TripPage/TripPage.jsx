import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Container, Row, Col, Modal, Button } from 'react-bootstrap';
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
      <Container>
        <h3>Which trip would you like to look at?</h3>


        <CardGroup>

          {trips.map(trip => {
            return (


              <Card key={trip.id} border="dark" style={{ width: '10rem' }}>
                <Card.Body onClick={() => setTripDetails(trip)}>
                  <Card.Title as="h3">{trip.trip_name}</Card.Title>
                  <Card.Subtitle>Travel Dates</Card.Subtitle>
                  <Card.Text>{moment(trip.start).format('MMM Do YYYY')} to {moment(trip.end).format('MMM Do YYYY')}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>



        <div className="col-lg">
          <div className="row">
            <CardGroup>
              <Card border="dark">
                <Card.Body>
                  <Button variant="primary" onClick={handleShow}>New Trip</Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body><TripForm /></Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        </div>

      </Container >
    </>
  )
}



export default TripPage;
