import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';
import moment from 'moment';
// import EditActivity from '../EditActivity/EditActivity';
import { useState } from 'react';
import ActivityList from '../ActivityList/ActivityList';



function TripDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);

    const store = useSelector(store => store);
    const itinerary = useSelector(store => store.itinerary);
    console.log('store is', store);
    console.log('itinerary store', itinerary);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Time of Day</th>
                        <th>Constraints</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {itinerary.map(item => {
                        return (

                            <tr key={item.id}>
                                {/* <td>
                                    {moment(item.date).format('MMM Do YYYY')}<br /><Button onClick={() => { history.push('/edit') }}><FontAwesomeIcon icon="info-circle" />
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button onClick={() => { history.push('/edit') }}><FontAwesomeIcon icon="edit" /></Button>
                                </td> */}
                                <td>{item.name}</td>

                                <td>{item.time_of_day}</td>


                                <td>{item.constraints}</td>
                                <td>{item.notes}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Container >

    );
}
export default TripDetails;