import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Dropdown, Modal, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css';
import ActivityList from '../ActivityList/ActivityList';


function EditActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [tod, setTod] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Editing Activity`);

        dispatch({
            type: 'EDIT_ACTIVITY',
            payload: {
                time_of_day: tod,
                date: date,
            }
        });
        // history.push(`/${itinId}`)


    }
    return (
        <Container>
            <ButtonGroup variant="outline-info" size='sm'>
                <Button variant="outline-primary" size='sm' onClick={handleShow}>
                    <FontAwesomeIcon icon="info-circle" />
                </Button>
                <Button variant="outline-primary" size='sm' onClick={handleShow}>
                    <FontAwesomeIcon icon="edit" />            </Button>
            </ButtonGroup>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            Time of Day
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Morning</Dropdown.Item>
                            <Dropdown.Item>Noon</Dropdown.Item>
                            <Dropdown.Item>Afternoon</Dropdown.Item>
                            <Dropdown.Item>Evening</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Toggle>
                    </Dropdown>
                    {/* <Form.Label>Change Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Change Date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form> */}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}

export default EditActivity;

