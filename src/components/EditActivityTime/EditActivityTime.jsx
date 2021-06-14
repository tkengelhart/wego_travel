import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Dropdown, Modal, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css';
import ActivityList from '../ActivityList/ActivityList';


function EditActivityTime(itemId) {
        const dispatch = useDispatch();
        const history = useHistory();
        const [tod, setTod] = useState('');
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
                                activityId: currentActivityUpdate.itineraryId
                        }
                });
                history.push(`/details/${currentActivityUpdate.itineraryId}`)
        }

        return (
                <Container>
                        <Form onSubmit={(event) => handleSubmit(event)}>
                                <select
                                        required
                                        onChange={(event) => setTod(event.target.value)}>
                                        <option value='Morning' >Morning</option>
                                        <option value='Noon' >Noon</option>
                                        <option value='Afternoon' >Afternoon</option>
                                        <option value='Evening' >Evening</option>
                                        <option value='All Day' >All Day</option>
                                </select>

                                <br />

                                <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                </Container >
        )
}

export default EditActivityTime;

