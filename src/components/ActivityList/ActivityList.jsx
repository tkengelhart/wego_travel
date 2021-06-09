import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';




function ActivityList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);
    let params = useParams();

    let itinId = params.id;
    let itin = activities.find(activity => activity.id === Number(itinId));


    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });

    }, []);

    const setActivityList = (activity) => {
        dispatch({
            type: 'SET_DETAILS',
            payload: activity,
        });
        history.push(`/activity/${activity.id}`);
    }


    const editClick = event => {
        // event.preventDefault();
        console.log(`Editing activity`, activities.id);
        dispatch({
            type: 'EDIT_ACTIVITY', itin
        });
    }

    const infoClick = event => {
        // event.preventDefault();
        console.log(`Activity info`, activities.id);
        dispatch({
            type: 'EDIT_ACTIVITY', itin
        });
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
                                <td>
                                    {activity.name}<br /><Button onClick={() => setActivityList(activity)}><FontAwesomeIcon icon="info-circle" />
                                    </Button>
                                &nbsp;&nbsp;
                                <Button onClick={() => editClick(activity)}><FontAwesomeIcon icon="edit" /></Button>
                                </td>
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