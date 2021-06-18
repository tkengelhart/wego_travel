import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal, Form, Tooltip, OverlayTrigger, CardGroup, Card, Column, Row, CardDeck, CardList, Offcanvas } from 'react-bootstrap';
import { useHistory, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';


function ActivityList() {
    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);



    const deleteActivity = (activityId) => {
        alert('Are you sure you want to delete?');
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


                <Button variant="success"
                    onClick={() => history.push('/add')}>New Activity</Button>

                <Button variant="success"
                    onClick={() => history.push('/trips')}>View Trips</Button>

                <Row>
                    <CardDeck>

                        {activities.map(info => {
                            return (
                                <Card key={info.id} className="activity-list">
                                    <Card.Title className="activity-title">
                                        {info.name}                            </Card.Title>

                                    <Card.Body className="activity-body">
                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                setActivityDetails(info.id);
                                            }}>




                                            <FontAwesomeIcon icon="info-circle" />
                                        </Button>

                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                chooseItinerary(info.id)
                                            }}>
                                            <FontAwesomeIcon icon="plus-square" />
                                        </Button>

                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                editDetails(info.id);
                                            }}>
                                            <FontAwesomeIcon icon="edit" />
                                        </Button>

                                        <Button variant="danger" size='sm'
                                            onClick={(event) => deleteActivity(info.id)}>
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
                </Row>
            </Container>




        </>
    );
}



export default ActivityList;
