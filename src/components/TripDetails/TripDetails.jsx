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
import Weather from '../Weather/Weather';




function TripDetails(trip) {
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
        alert(`Are you sure you want to delete {item}?`);

        console.log('id is', activityId);
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: activityId,
        });
    }


    return (
        <>
            <Container fluid>
                <h1>Enjoy your trip to</h1>
                <h2 className="selected-name">name</h2>

                <p>You can see what has already been planned for this trip below.  You can also add new items by clicking 'Add Activities'</p>

                <div className="button-key">
                    <Button className="button-icons" variant="outline-danger" size='lg' title="Info" disabled>
                        <FontAwesomeIcon icon="info-circle" /><br />Info.
                    </Button>

                    <Button className="button-icons" variant="outline-danger" size='lg' title="Edit" disabled>
                        <FontAwesomeIcon icon="edit" /><br />Edit
                    </Button>

                    <Button className="button-icons" variant="outline-danger" size='lg' title="Delete" disabled>
                        <FontAwesomeIcon icon="trash-alt" /><br />Delete
                    </Button>
                </div>
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
                                        <Button variant="danger" size='sm' title="Info"
                                            onClick={() => {
                                                setActivityDetails(item.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon="info-circle" />
                                        </Button>
                                        <Button variant="danger" size='sm' title="Edit"
                                            onClick={() => {
                                                editDetails(item);
                                            }}>
                                            <FontAwesomeIcon icon="edit" />
                                        </Button>
                                        <Button variant="danger" size='sm' title="Delete"
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
                <Button variant="success" size="lg" title="Back"
                    onClick={() => history.goBack()}>Back</Button>

                <Button variant="success" size="lg" title="Add Activities"
                    onClick={() => history.push('/activity')}>Add Activities</Button>
            </Container>
            {/* <Weather /> */}
        </>
    );
}

export default TripDetails;