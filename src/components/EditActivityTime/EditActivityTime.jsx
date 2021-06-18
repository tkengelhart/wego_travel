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
                        <h2>Update activity below:</h2>
                        <Form onSubmit={(event) => handleSubmit(event)}>
                                <DropdownButton
                                        title="Time of Day"
                                        onSelect={(event) => setTod(event)}>
                                        <Dropdown.Item eventKey='Morning'>Morning</Dropdown.Item>
                                        <Dropdown.Item eventKey='Noon'>Noon</Dropdown.Item>
                                        <Dropdown.Item eventKey='Afternoon'>Afternoon</Dropdown.Item>
                                        <Dropdown.Item eventKey='Evening'>Evening</Dropdown.Item>
                                        <Dropdown.Item eventKey='All Day'>All Day</Dropdown.Item>
                                </DropdownButton>
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
                                        value={note}
                                        placeholder="Notes"
                                        onChange={(event) => setNote(event.target.value)}>

                                </textarea>


                                <br />

                                <Button variant="success" type="submit">Submit</Button>

                                <Button variant="success"
                                        onClick={() => history.goBack()}>Back</Button>
                        </Form >

                </Container >
        )
}

export default EditActivityTime;

