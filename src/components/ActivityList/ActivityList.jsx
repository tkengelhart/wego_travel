import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal, Form, Tooltip, OverlayTrigger, CardGroup, Card, Column, Row, CardDeck, CardList } from 'react-bootstrap';
import { useHistory, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import NewActivity from '../ChooseItinerary/ChooseItinerary';
import AddActivity from '../AddActivity/AddActivity';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import EditActivityInfo from '../EditActivityInfo/EditActivityInfo';
import ChooseItinerary from '../ChooseItinerary/ChooseItinerary';
import currentitineraryactivity from '../../redux/reducers/currentitineraryactivity.reducer';


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

    const editDetails = (info) => {
        console.log(`Editing activity`, info);
        dispatch({
            type: 'UPDATE_ACTIVITY_DETAILS',
            payload: info
        })
        history.push(`/edit`);

    };

    return (
        <>
            <Container>
                <Button variant="primary"
                    onClick={() => history.push('/add')}>New Activity</Button>

                <Button variant="primary"
                    onClick={() => history.push('/trips')}>View Trips</Button>

            </Container>
            <Container>
                <Row>
                    <CardDeck id="activity-list">

                        {activities.map(info => {
                            return (
                                <Card key={info.id}>
                                    <Card.Title className="activity-title">
                                        {info.name}                            </Card.Title>

                                    <Card.Body>
                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                setActivityDetails(info.id);
                                            }}>
                                            <FontAwesomeIcon icon="info-circle" />
                                        </Button>

                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                editDetails(info.id);
                                            }}>
                                            <FontAwesomeIcon icon="edit" />
                                        </Button>



                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                chooseItinerary(info.id)
                                            }}>
                                            <FontAwesomeIcon icon="plus-square" />
                                        </Button>

                                        <Button variant="danger" size='sm'
                                            onClick={(event) => deleteActivity(info.id)}>
                                            <FontAwesomeIcon icon="trash-alt" />
                                        </Button>
                                    </Card.Body>


                                    <Card.Body>
                                        {info.constraints}
                                    </Card.Body>
                                    <Card.Footer>
                                        {info.activity_location}
                                    </Card.Footer>

                                </Card>
                            )
                        })}
                    </CardDeck>
                </Row>
            </Container >




        </>
    );
}



export default ActivityList;
