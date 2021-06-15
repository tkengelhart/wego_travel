import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Modal, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function ChooseItinerary(trip) {
    useEffect(() => {
        dispatch({ type: 'FETCH_TRIPS' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();
    const trips = useSelector(store => store.trips);
    const currentChosenActivity = useSelector(store => store.currentitineraryactivity);
    console.log('store is', currentChosenActivity);

    const [itinerary, setItinerary] = useState('');
    const [tod, setTod] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Chosen trip`, { tod, date, notes });

        dispatch({
            type: 'ADD_TO_ITINERARY',
            payload: {
                itinerary_id: itinerary,
                activity_id: Number(currentChosenActivity),
                time_of_day: tod,
                date: date,
                notes: notes,
            }
        });

        history.goBack()
    };




    return (
        <>
            <Container>
                <Form onSubmit={(event) => handleSubmit(event)}>
                    <select

                        onChange={(event) => setItinerary(event.target.value)}>
                        <option defaultValue='Select'>Which Trip</option>

                        {trips.map(trip =>
                            <option key={trip.id} value={trip.id} > {trip.trip_name}
                            </option>
                        )}

                    </select>
                    <br />
                    <br />
                    <select
                        onChange={(event) => setTod(event.target.value)}>
                        <option defaultValue='Select'>Time Of Day</option>
                        <option value='Morning'>Morning</option>
                        <option value='Noon'>Noon</option>
                        <option value='Afternoon'>Afternoon</option>
                        <option value='Evening'>Evening</option>
                        <option value='All Day'>All Day</option>
                    </select>

                    <br />
                    <br />
                    <input
                        type="date"
                        placeholder="Enter New Date"
                        onChange={(event) => setDate(event.target.value)}></input>
                    <br />
                    <br />
                    <textarea
                        type="text"
                        placeholder="Notes"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}>

                    </textarea>
                    <br />
                    <br />
                    <Button variant="outline-info" type="submit">
                        Submit
                    </Button><Button variant="outline-info" onClick={() => history.goBack()}>Cancel</Button>
                </Form>
            </Container >
        </>
    )
}



export default ChooseItinerary;