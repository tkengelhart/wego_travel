import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';
import moment from 'moment';
// import EditActivity from '../EditActivity/EditActivity';
import { useState } from 'react';
import ActivityList from '../ActivityList/ActivityList';
import EditActivityTime from '../EditActivityTime/EditActivityTime';
import WeatherSearch from '../../Weather/Weather';



function TripDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);

    const store = useSelector(store => store);
    const itinerary = useSelector(store => store.itinerary);
    console.log('store is', store);
    console.log('itinerary store', itinerary);


    const setActivityDetails = (activityId) => {
        history.push(`/activity/${activityId}`);
    }


    const editDetails = (item) => {
        console.log(`Editing activity itinerary`);
        console.log('itinerary item is', item);
        dispatch({
            type: 'UPDATE_ITINERARY_ACTIVITY',
            payload: item
        })
        history.push(`/activityupdate`);

    };

    const deleteActivity = (activityId) => {
        alert('Are you sure you want to delete?');

        console.log('id is', activityId);
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: activityId,
        });
    }

    // const showMessage = (itinerary) => {
    //     if (itinerary.map != 0) {
    //         <h3>Great, looks like you have already made some plans!</h3>
    //     } else {
    //         <h3>Looks like you have some planning to do!</h3>
    //     }


    // }


    return (
        <>
            <Container fluid>
                <h1>Enjoy your trip to</h1>
                <Table striped hover size="sm">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Time of Day</th>
                            <th>Things to Consider</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itinerary.map(item => {
                            return (
                                <tr key={item.itineraryId}>

                                    <td>{moment(item.date).format('MMM Do YYYY')}<br />
                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                setActivityDetails(item.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon="info-circle" />
                                        </Button>
                                        <Button variant="danger" size='sm'
                                            onClick={() => {
                                                editDetails(item);
                                            }}>
                                            <FontAwesomeIcon icon="edit" />
                                        </Button>
                                        <Button variant="danger" size='sm'
                                            onClick={(event) => deleteActivity(item.id)}>
                                            <FontAwesomeIcon icon="trash-alt" />
                                        </Button>
                                    </td>

                                    <td>{item.name}</td>

                                    <td>{item.time_of_day}</td>


                                    <td>{item.constraints}</td>
                                    <td>{item.notes}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </Table>
                <Button variant="success"
                    onClick={() => history.goBack()}>Back</Button>

                <Button variant="success"
                    onClick={() => history.push('/activity')}>Add Activities</Button>
            </Container>
        </>
    );
}

export default TripDetails;