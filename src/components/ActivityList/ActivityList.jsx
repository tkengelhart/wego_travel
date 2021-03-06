import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Container, Table, Button, Modal, Form, Tooltip, OverlayTrigger, CardGroup, Card, Column, Row, CardDeck, CardList, Offcanvas } from 'react-bootstrap';
import { useHistory, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import { useParams } from 'react-router-dom';


function ActivityList(info) {
    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);
    const dispatch = useDispatch();
    const history = useHistory();
    let params = useParams();

    const activities = useSelector(store => store.activities);
    let activityId = params.activityId;

    let currentActivityDelete = activities.find(currentActivityDelete => currentActivityDelete.id === Number(activityId));
    console.log(`found activity: `, currentActivityDelete);

    const deleteActivity = (activityId) => {
        // alert('Are you sure you want to delete {currentActivityDelete}');
        console.log('id is', activityId);
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: activityId,
        });
    }
    const setActivityDetails = (activityId) => {
        history.push(`/activity/${activityId}`);
    }

    const chooseItinerary = (info) => {
        console.log(`Choosing your itinerary`, info);
        dispatch({
            type: 'CHOOSE_YOUR_ITINERARY',
            payload: info
        })
        history.push(`/additinerary`);
    }

    const editDetails = (activityId) => {
        console.log(`Editing activity`, activityId);
        dispatch({
            type: 'UPDATE_ACTIVITY_DETAILS',
            payload: activityId
        })
        history.push(`/edit`);

    };

    return (
        <>
            <Container fluid>
                <h1>Choose your Adventure</h1>
                <p>Below you can see a list of all of the activities that have been added.
                    When you click the add button, you will be able to include that activity into your itinerary.  There are also options to get information, edit an activity and delete an activity.
                    If you want to add a new activity, please click 'Add Activity'</p>
                <div className="button-key">
                    <Button className="button-icons" variant="outline-danger" size='lg' title="info" disabled>
                        <FontAwesomeIcon icon="info-circle" /><br />Info.
                    </Button>

                    <Button className="button-icons" variant="outline-danger" size='lg' title="add" disabled>
                        <FontAwesomeIcon icon="plus-square" /><br />Add
                    </Button>

                    <Button className="button-icons" variant="outline-danger" size='lg' title="edit" disabled>
                        <FontAwesomeIcon icon="edit" /><br />Edit
                    </Button>

                    <Button className="button-icons" variant="outline-danger" size='lg' title="delete" disabled>
                        <FontAwesomeIcon icon="trash-alt" /><br />Delete
                    </Button>
                </div>
                <br />
                <Button variant="success" size="lg" title="New Activity"
                    onClick={() => history.push('/add')}>New Activity</Button>

                <Button variant="success" size="lg" title="View Trips"
                    onClick={() => history.push('/trips')}>View Trips</Button>

                <Row>

                    <Container className="activity-cards">
                        <CardDeck>

                            {activities.map(info => {
                                return (
                                    <Card key={info.id} className="activity-list">
                                        <Card.Title className="activity-title">
                                            {info.name}                            </Card.Title>

                                        <Card.Body className="activity-body">
                                            <Button variant="danger" size='sm' title="Info"
                                                onClick={() => {
                                                    setActivityDetails(info.id);
                                                }}>

                                                <FontAwesomeIcon icon="info-circle" />
                                            </Button>

                                            <Button variant="danger" size='sm' title="Add"
                                                onClick={() => {
                                                    chooseItinerary(info.id)
                                                }}>
                                                <FontAwesomeIcon icon="plus-square" />
                                            </Button>

                                            <Button variant="danger" size='sm' title="Edit"
                                                onClick={() => {
                                                    editDetails(info.id);
                                                }}>
                                                <FontAwesomeIcon icon="edit" />
                                            </Button>

                                            <Button variant="danger" size='sm' title="Delete"
                                                onClick={(event) =>
                                                    deleteActivity(info.id)}>
                                                <FontAwesomeIcon icon="trash-alt" />
                                            </Button>

                                        </Card.Body>


                                        <Card.Body className="activity-body">
                                            {info.constraints}
                                        </Card.Body>
                                        <Card.Footer className="activity-footer">
                                            {info.activity_location}
                                        </Card.Footer>

                                    </Card>
                                )
                            })}
                        </CardDeck>
                    </Container>
                </Row>
            </Container>




        </>
    );
}



export default ActivityList;
