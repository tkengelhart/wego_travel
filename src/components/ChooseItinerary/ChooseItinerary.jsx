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
    const currentChosenActivity = useSelector(store => store.currentitineraryactivity);


    const [itinerary, setItinerary] = useState('');
    const [tod, setTod] = useState('');
    // const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (trip) => {
        event.preventDefault();
        console.log(`Chosen trip`, { itinerary, tod, notes });

        dispatch({
            type: 'ADD_TO_ITINERARY',
            payload: {
                itinerary_id: currentChosenActivity.itinerary_id,
                activity_id: currentChosenActivity.activity_id,
                trip_name: itinerary,
                time_of_day: tod,
                // date: date,
                notes: notes,
            }
        });
        history.push('/activity');
    };




    return (
        <>
            <Container>
                <Form onSubmit={(event) => handleSubmit(event)}>

                    <select

                        onChange={(event) => setItinerary(event.target.value)}>
                        {trips.map(trip =>
                            <option key={trip.id} value={trip.trip_name} >{trip.trip_name}
                            </option>
                        )}

                    </select>

                    <select
                        onChange={(event) => setTod(event.target.value)}>
                        <option value='Select'>Time Of Day</option>
                        <option value='Morning'>Morning</option>
                        <option value='Noon'>Noon</option>
                        <option value='Afternoon'>Afternoon</option>
                        <option value='Evening'>Evening</option>
                        <option value='All Day'>All Day</option>
                    </select>

                    <textarea
                        type="text"
                        placeholder="Notes go here"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}>

                    </textarea>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button><Button variant="primary" onClick={() => history.goBack()}>Cancel</Button>
                </Form>
            </Container >
        </>
    )
}



export default ChooseItinerary;