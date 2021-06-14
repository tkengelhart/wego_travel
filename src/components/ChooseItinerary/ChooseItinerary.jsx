import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Modal, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function ChooseItinerary() {
    useEffect(() => {
        dispatch({ type: 'FETCH_TRIPS' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();
    const trips = useSelector(store => store.trips);

    const [itinerary, setItinerary] = useState('');
    const [tod, setTod] = useState('');
    // const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Chosen trip`, { itinerary, tod, notes });

        dispatch({
            type: 'ADD_TO_ITINERARY',
            payload: {
                trip_name: itinerary,
                time_of_day: tod,
                // date: date,
                notes: notes,
            }
        });
        history.push('/activity');
    };




    return (

        <Container>
            <Form onSubmit={(event) => handleSubmit(event)}>

                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        Which trip?
                    </Dropdown.Toggle>
                    <Dropdown.Menu onSelect={(event) => setItinerary(event.target.value)} >
                        {trips.map((trip) => <Dropdown.Item key={trip.id} value={itinerary} >
                            {trip.trip_name}
                        </Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>


                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        What time of day?
                    </Dropdown.Toggle>
                    <Dropdown.Menu onSelect={(event) => setTod(event.target.value)}>
                        <Dropdown.Item key="1">Morning
                        </Dropdown.Item>
                        <Dropdown.Item key="2">Lunch
                        </Dropdown.Item> <Dropdown.Item key="3">Afternoon
                        </Dropdown.Item> <Dropdown.Item key="4">Evening
                        </Dropdown.Item>
                        <Dropdown.Item key="5">All Day
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>



                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text onChange={(event) => setNotes(event.target.value)}>Any Notes?</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>
                <Button variant="primary" type="submit">
                    Submit
                </Button><Button variant="primary" onClick={() => history.goBack()}>Cancel</Button>
            </Form>
        </Container >
    )
}



export default ChooseItinerary;