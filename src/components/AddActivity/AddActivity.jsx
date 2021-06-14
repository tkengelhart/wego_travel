import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function AddActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const [name, setName] = useState('');
    const [constraints, setConstraints] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Adding new activity`, { name, constraints, website, location });
        dispatch({
            type: 'ADD_ACTIVITY',
            payload: {
                name: name,
                constraints: constraints,
                activity_url: website,
                activity_location: location,
            }
        });
        history.push('/activity')


    }
    return (
        <Container>

            <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Group>
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="What do you want to do?"
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Constraints</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex. Closed certain days, early close, etc."
                        value={constraints}
                        onChange={(event) => setConstraints(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Website:</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Website Url"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Where is it located?"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)} />
                </Form.Group>


                <Button variant="primary" type="submit">Submit</Button>            <Button variant="primary" onClick={() => history.goBack()}>Cancel</Button>


            </Form>


        </Container>
    )
}




export default AddActivity;