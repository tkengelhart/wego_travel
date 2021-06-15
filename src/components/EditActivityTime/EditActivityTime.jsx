import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Dropdown, Modal, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ActivityList from '../ActivityList/ActivityList';


function EditActivityTime(itemId) {
        const dispatch = useDispatch();
        const history = useHistory();
        const [tod, setTod] = useState('');
        const [date, setDate] = useState('');
        const [note, setNote] = useState('');
        const itinerary = useSelector(store => store.itinerary);
        console.log('itinerary store is', itinerary);

        const currentActivityUpdate = useSelector(store => store.currentitineraryactivity);

        const handleSubmit = event => {
                event.preventDefault();
                console.log(`Editing Activity`, currentActivityUpdate);

                dispatch({
                        type: 'EDIT_ACTIVITY_ITINERARY',
                        payload: {
                                activityTime: tod,
                                activityDate: date,
                                activityNote: note,
                                activityId: currentActivityUpdate.itineraryId
                        }
                });
                history.push(`/details/${currentActivityUpdate.itineraryId}`)
        }

        return (
                <Container>
                        <Form onSubmit={(event) => handleSubmit(event)}>
                                <select
                                        label="Time Of Day"
                                        placeholder="Time Of Day"
                                        required
                                        onChange={(event) => setTod(event.target.value)}>
                                        <option defaultValue='Time Of Day' >Time Of Day</option>
                                        <option value='Morning' >Morning</option>
                                        <option value='Noon' >Noon</option>
                                        <option value='Afternoon' >Afternoon</option>
                                        <option value='Evening' >Evening</option>
                                        <option value='All Day' >All Day</option>
                                </select>
                                <input
                                        type="date"
                                        placeholder="Enter New Date"
                                        onChange={(event) => setDate(event.target.value)}></input>
                                <br />
                                <br />

                                <textarea
                                        type="text"
                                        value={note}
                                        placeholder="Notes"
                                        onChange={(event) => setNote(event.target.value)}>

                                </textarea>


                                <br />

                                <Button variant="outline-info" type="submit">Submit</Button>
                        </Form>
                        <Button variant="outline-info"
                                onClick={() => history.goBack()}>Back</Button>
                </Container >
        )
}

export default EditActivityTime;

