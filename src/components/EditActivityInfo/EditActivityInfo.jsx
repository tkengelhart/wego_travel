import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';



function EditActivityInfo(info) {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);
    const activityList = useSelector(store => store.activities);

    const currentActivityEdit = useSelector(store => store.currentitineraryactivity);

    const activity = activityList.find(activity => activity.id === currentActivityEdit);
    if (!activity) {
        return (
            <h1>Loading</h1>
        )
    }
    console.log('current activity is', activity);


    const [editName, setEditName] = useState(activity.name);
    const [editConstraints, setEditConstraints] = useState(activity.constraints);
    const [editWebsite, setEditWebsite] = useState(activity.activity_url);
    const [editLocation, setEditLocation] = useState(activity.activity_location);



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
        <Container fluid className="formPanel">
            <h1>Update activity information for</h1>
            <h2 className="activity-name">{editName}</h2>
            <>
                <Form key={activity.id} onSubmit={(event) => handleSubmit(event)}>
                    <Form.Group>
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={activity.name}
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

                    <Button variant="success" type="submit">Submit</Button>
                    &nbsp;&nbsp;
                    <Button variant="success"
                        onClick={() => history.goBack()}>Back</Button>

                </Form>


            </>
        </Container>

    )
}
export default EditActivityInfo;