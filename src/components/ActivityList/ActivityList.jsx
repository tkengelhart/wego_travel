import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




function ActivityList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);

    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });

    }, []);

    const setActivityList = (activity) => {
        dispatch({
            type: 'SET_ACTIVITIES',
            payload: activity,
        });
        // history.push(`/activity/${activity.id}`);
    }


    const editClick = event => {
        event.preventDefault();
        console.log(`Editing activity`, id);
        dispatch({
            type: 'ADD_TRIP',
            payload: {
                trip_name: trip,
                start: start,
                end: end,
            }
        });
        history.push("/trips")


    }

    return (

        <Container>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Notes</th>
                        <th>Website</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => {
                        return (
                            <tr key={activity.id}>
                                <td>{activity.name}<br /><FontAwesomeIcon icon="info-circle" />&nbsp;<FontAwesomeIcon icon="edit" /></td>
                                <td>{activity.constraints}</td>
                                <td>{activity.activity_url}</td>
                                <td>{activity.activity_location}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>

        </Container >
    );
}
export default ActivityList;

{/* <ul>
    {activities.map(activity => {
        return (
            <li key={activity.id}>{activity.name}</li>
        )
    })}

</ul> */}