import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useHistory, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Container>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Constraints</th>
                        <th>Location</th>
                    </tr>
                </thead>

                <tbody>
                    {activities.map(info => {
                        return (
                            <tr key={info.id}>
                                <td>
                                    {info.name}<br /><br />
                                    <Button variant="outline-info" size='sm'
                                        onClick={() => {
                                            setActivityDetails(info.id);
                                        }}>
                                        <FontAwesomeIcon icon="info-circle" />
                                    </Button>
                                    <Button variant="outline-info" size='sm'
                                        onClick={() => {
                                            editDetails(info.id);

                                        }}>
                                        <FontAwesomeIcon icon="edit" />
                                    </Button>


                                    <Button variant="outline-info" size='sm'
                                        onClick={() => {
                                            chooseItinerary(info.id)
                                        }}>
                                        <FontAwesomeIcon icon="plus-square" />
                                    </Button>

                                    <Button variant="outline-info" size='sm'
                                        onClick={(event) => deleteActivity(info.id)}>
                                        <FontAwesomeIcon icon="trash-alt" />
                                    </Button>
                                </td>

                                <td>
                                    {info.constraints}
                                </td>
                                <td>
                                    {info.activity_location}
                                </td>


                            </tr>)
                    })}
                </tbody>
            </Table >

            <Button variant="outline-info"
                onClick={() => history.push('/add')}>New Activity</Button>
            <Button variant="outline-info"
                onClick={() => history.push('/trips')}>View Trips</Button>
        </Container >

    );
}



export default ActivityList;


// <Container>

// <Table striped hover>
//     <thead>
//         <tr>
//             <th>Name</th>
//             <th>Constraints</th>
//             <th>Location</th>
//         </tr>
//     </thead>

//     <tbody>
//         {activities.map(info => {
//             return (
//                 <tr key={info.id}>
//                     <td>
//                         {info.name}<br />
//                         <Button variant="outline-primary" size='sm'
//                             onClick={() => {
//                                 handleShow();
//                                 setActivityDetails(info.id);
//                             }}
//                         >
//                             <FontAwesomeIcon icon="info-circle" />
//                         </Button>
//                         <Modal show={show} onHide={handleClose}>
//                             <Modal.Body><ActivityInfo /></Modal.Body>
//                             <Modal.Footer>
//                                 <Button variant="primary" onClick={handleClose}>
//                                     Close
//                                 </Button>
//                             </Modal.Footer>
//                         </Modal>

//                         <Button variant="outline-primary" size='sm'
//                             onClick={handleShow}>
//                             <FontAwesomeIcon icon="edit" />
//                         </Button>
//                         <Modal show={show} onHide={handleClose}>
//                             <Modal.Body><Route><EditActivityInfo /></Route></Modal.Body>
//                             <Modal.Footer>
//                                 <Button variant="primary" onClick={handleClose}>
//                                     Close
//                                 </Button>
//                             </Modal.Footer>
//                         </Modal>
//                     </td>

//                     <td>
//                         {info.constraints}
//                     </td>
//                     <td>
//                         {info.activity_location}
//                     </td>
//                     <td>
//                         <Button variant="outline-primary" size='sm'
//                             onClick={handleShow}>
//                             <FontAwesomeIcon icon="plus-square" />
//                         </Button>
//                         <Modal show={show} onHide={handleClose}>
//                             {/* <Modal.Body><EditActivityTime /></Modal.Body> */}
//                             <Modal.Footer>
//                                 <Button variant="primary" onClick={handleClose}>
//                                     Close
//                                 </Button>
//                             </Modal.Footer>
//                         </Modal>
//                     </td>

//                     <td><Button variant="outline-primary" size='sm'
//                         onClick={(event) => deleteActivity(info.id)}>
//                         <FontAwesomeIcon icon="trash-alt" />
//                     </Button></td>
//                 </tr>)
//         })}
//     </tbody>
// </Table >

// <Button variant="primary"
//     onClick={handleShow}>New Activity</Button>
// <Modal show={show} onHide={handleClose}>
//     <Modal.Body><NewActivity /></Modal.Body>

// </Modal>

// </Container >