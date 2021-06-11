import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';




function TripDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);
    // const trips = useSelector(store => store.trips);
    // console.log('trips are', trips);
    const store = useSelector(store => store);
    const itinerary = useSelector(store => store.itinerary);
    console.log('store is', store);
    console.log('itinerary store', itinerary);

    // let itinId = itinerary.id;
    // let itin = activities.filter(activity => activity.id === Number(itinId));
    // console.log('filtered results are', itin);



    useEffect(() => {
        dispatch({
            type: 'SET_ITINERARY_ACTIVITIES',
            payload: itinerary.id
        });
        history.push(`/details/${itinerary.id}`)
    })
    // const editClick = event => {
    //     console.log(`Editing activity`, activities.id);
    //     dispatch({
    //         type: 'EDIT_ACTIVITY', itin
    //     });
    //     history.push(`/${itinId}`)
    // }

    // const infoClick = event => {
    //     // event.preventDefault();
    //     console.log(`Activity info`, activities.id);
    //     dispatch({
    //         type: 'EDIT_ACTIVITY', itin
    //     });
    // }

    return (

        <Container>
            <li>Activity Date {itinerary.start} {itinerary.end} {itinerary.trip_name}</li>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time of Day</th>
                        <th>Constraints</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity => {
                        return (

                            <tr key={activity.id}>
                                <td>
                                    {activity.date}<br /><Button onClick={() => setActivityList(activity)}><FontAwesomeIcon icon="info-circle" />
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button onClick={() => editClick(activity)}><FontAwesomeIcon icon="edit" /></Button>
                                </td>
                                <td>{activity.time_of_day}{activity.name}</td>
                                <td>{activity.constraints}</td>
                                <td>{activity.notes}</td>
                            </tr>
                        );
                    })}


                </tbody>
            </Table>

        </Container >
    );
}
export default TripDetails;