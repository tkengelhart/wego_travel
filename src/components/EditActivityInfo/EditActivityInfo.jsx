import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


function EditActivityInfo() {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });

    }, []);
    const activityList = useSelector(store => store.activities);
    const [editName, setEditName] = useState('');
    const [editConstraints, setEditConstraints] = useState('');
    const [editWebsite, setEditWebsite] = useState('');
    const [editLocation, setEditLocation] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Updating activity`, { editName, editConstraints, editWebsite, editLocation });

        dispatch({
            type: 'EDIT_ACTIVITY_INFO',
            payload: {
                name: editName,
                constraints: editConstraints,
                activity_url: editWebsite,
                activity_location: editLocation,
            }
        });
    }

    // let params = useParams();
    // console.log(params);

    // let activityId = params.activityId;


    // let activity = activityList.find(activity => activity.id === Number(activityId));
    // console.log(params.activityId);
    // console.log(`found activity: `, activity);

    // if (!activity) {
    //     return <h2>Invalid activity ID</h2>;
    // }


    return (
        <Container>
            <>
                {activityList.map(edit => {
                    return (

                        <Form onSubmit={(event) => handleSubmit(event)}>
                            <Form.Group>
                                <Form.Label>Activity Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={edit.name}
                                    value={editName}
                                    onChange={(event) => setEditName(event.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Constraints</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={edit.constraints}
                                    value={editConstraints}
                                    onChange={(event) => setEditConstraints(event.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Website:</Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder={edit.activity_url}
                                    value={editWebsite}
                                    onChange={(event) => setEditWebsite(event.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Location:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={edit.activity_location}
                                    value={editLocation}
                                    onChange={(event) => setEditLocation(event.target.value)} />
                            </Form.Group>


                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>


                    )
                })}

            </>
        </Container >

    )
}
export default EditActivityInfo;