import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function EditActivityInfo(info) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);

    const activityList = useSelector(store => store.activities);
    const [editName, setEditName] = useState('');
    const [editConstraints, setEditConstraints] = useState('');
    const [editWebsite, setEditWebsite] = useState('');
    const [editLocation, setEditLocation] = useState('');

    const currentActivityEdit = useSelector(store => store.currentitineraryactivity);



    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Updating activity`, { info, editName, editConstraints, editWebsite, editLocation });

        dispatch({
            type: 'EDIT_ACTIVITY_INFO',
            payload: {
                activityId: currentActivityEdit,
                name: editName,
                constraints: editConstraints,
                activity_url: editWebsite,
                activity_location: editLocation,
            }
        });
        history.push('/activity')
    }





    return (
        <Container>
            <>
                <Form onSubmit={(event) => handleSubmit(event)}>
                    <Form.Group>
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Name'
                            value={editName}
                            onChange={(event) => setEditName(event.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Constraints</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Constraints'
                            value={editConstraints}
                            onChange={(event) => setEditConstraints(event.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Website:</Form.Label>
                        <Form.Control
                            type="url"
                            placeholder='Website address'
                            value={editWebsite}
                            onChange={(event) => setEditWebsite(event.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Location:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Location'
                            value={editLocation}
                            onChange={(event) => setEditLocation(event.target.value)} />
                    </Form.Group>


                    <Button variant="primary" type="submit">Submit</Button>
                </Form>


            </>
        </Container >

    )
}
export default EditActivityInfo;