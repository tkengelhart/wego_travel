import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    return (

        <Container>
            <Table striped bordered hover>
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
                                <td>{activity.name}</td>
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