import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';
// import EditActivity from '../EditActivity/EditActivity';
import { useState } from 'react';
import ActivityInfo from '../ActivityInfo/ActivityInfo';


function ActivityList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);
    console.log('activities are', activities);
    let params = useParams();
    const trips = useSelector(store => store.trips);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let itinId = params.id;


    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });

    }, []);

    // const editActivity = (activity) => {
    //     console.log(`Edit activity`, activity);
    //     dispatch({
    //         type: 'EDIT_ACTIVITY',
    //         payload: activity
    //     })
    // }

    const infoClick = (activity) => {
        console.log(`Activity info`, activities.id);
        // dispatch({
        //     type: 'SET_DETAILS',
        //     payload: activity,
        history.push(`/activity/info`);

    }


    return (

        <Container>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Notes</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => {
                        return (
                            <tr key={activity.id}>
                                <td>
                                    {activity.name}<br />
                                    <Button onClick={() => infoClick(event)}><FontAwesomeIcon icon="info-circle" /></Button>

                                </td>
                                <td>{activity.constraints}</td>
                                <td>{activity.activity_location}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>


        </Container >
    );
}
export default ActivityList;


// <br /><Button onClick={() => setActivityList(activity)}><FontAwesomeIcon icon="info-circle" />
//                                     </Button>
//                                 &nbsp;&nbsp;
//                                 <Button onClick={() => editActivity(activity.id)}><FontAwesomeIcon icon="edit" /></Button>