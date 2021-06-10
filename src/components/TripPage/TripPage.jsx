import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TripForm from '../TripForm/TripForm';


function TripPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const trips = useSelector(store => store.trips);
  let params = useParams();
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
      payload: { tripId: trip.id }
    });
    history.push('/')
  }

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            {trips.map((trip) =>
              <Card key={trip.id} border="dark" onClick={() => setTripDetails(trip)}>
                <Card.Body>
                  <Card.Title >{trip.trip_name}</Card.Title>
                  <Card.Subtitle>Travel Dates</Card.Subtitle>
                  <Card.Text>{moment(trip.start).format('MMM Do YYYY')} to {moment(trip.end).format('MMM Do YYYY')}</Card.Text>
                </Card.Body>
              </Card>
            )};

          </CardGroup>
        </Col>
      </Row>
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
    </Container>

  )
}



export default TripPage;
