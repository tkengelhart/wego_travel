import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Dropdown, Modal, ButtonGroup, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
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
                <Container fluid className="formPanel">
                        <h1>Update <span className="activity-name">{currentActivityUpdate.name}</span></h1>
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
                                <InputGroup>
                                        <FormControl
                                                type="date"
                                                defaultValue={currentActivityUpdate.date}
                                                placeholder="Enter New Date"
                                                onChange={(event) => setDate(event.target.value)} /></InputGroup>
                                <br />
                                <br />

                                <InputGroup>
                                        <FormControl
                                                type="text"
                                                value={note}
                                                event={note}
                                                placeholder="Notes"
                                                onChange={(event) => setNote(event.target.value)} />

                                </InputGroup>

                                <br />

                                <Button variant="success" type="submit" title="Submit">Submit</Button>

                                <Button variant="success" title="Back"
                                        onClick={() => history.goBack()}>Back</Button>
                        </Form >

                </Container>
        )
}

export default EditActivityTime;

