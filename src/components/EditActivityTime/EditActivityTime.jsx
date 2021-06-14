import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Dropdown, Modal, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css';
import ActivityList from '../ActivityList/ActivityList';


function EditActivityTime() {
        const dispatch = useDispatch();
        const history = useHistory();
        const [tod, setTod] = useState('');
        // const [date, setDate] = useState('');
        // const [show, setShow] = useState(false);
        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);

        const handleSubmit = event => {
                event.preventDefault();
                console.log(`Editing Activity`, tod);

                dispatch({
                        type: 'EDIT_ACTIVITY_ITINERARY',
                        payload: tod

                });
                // history.push(`/${itinId}`)




        }
        return (
                <Container>
                        <Form onSubmit={(event) => handleSubmit(event)}>
                                <Dropdown>
                                        <Dropdown.Toggle variant="primary">
                                                Time of Day
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu onSelect={(event) => setTod(event.target.value)}>
                                                <Dropdown.Item key="1">Morning</Dropdown.Item>
                                                <Dropdown.Item key="2">Noon</Dropdown.Item>
                                                <Dropdown.Item key="3">Afternoon</Dropdown.Item>
                                                <Dropdown.Item key="4">Evening</Dropdown.Item>
                                                <Dropdown.Item key="5">All Day</Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>

                                <br />

                                <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                </Container >
        )
}

export default EditActivityTime;

