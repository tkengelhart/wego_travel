import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


function TripForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [trip, setTrip] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const curr = new Date();
    curr.setDate(curr.getDate() + 3);
    const date = curr.toISOString().substr(0, 10);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Adding trip`, { start, end, trip });
        dispatch({
            type: 'ADD_TRIP',
            payload: {
                trip_name: trip,
                start: start,
                end: end,
            }
        });
        history.push("/trips")


    }
    return (
        <Container fluid className="formPanel">
            <h1>Add new trip details below:</h1>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Group>
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Where are you off to?"
                        value={trip}
                        onChange={(event) => setTrip(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Leaving:</Form.Label>
                    <Form.Control
                        input id="dateRequired"
                        required
                        type="date"
                        name="dateRequired"
                        defaultValue="{date}"
                        placeholder="Leaving?"
                        value={start}
                        onChange={(event) => setStart(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Returning:</Form.Label>
                    <Form.Control
                        input id="dateRequired"
                        required
                        type="date"
                        name="dateRequired"
                        defaultValue="{date}"
                        placeholder="Returning??"
                        value={end}
                        onChange={(event) => setEnd(event.target.value)} />
                </Form.Group>
                <Button variant="success" title="Submit" type="submit">Submit</Button>
            </Form>

        </Container>
    )
}




export default TripForm;