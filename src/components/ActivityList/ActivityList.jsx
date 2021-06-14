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


function ActivityList() {
    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);
    console.log('info is', activities);

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const deleteActivity = (activityId) => {
        console.log('id is', activityId);
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: activityId,
        });
    }
    const setActivityDetails = (activityId) => {
        history.push(`/activity/${activityId}`);
    }

    const chooseItinerary = (activityId) => {
        history.push(`/additinerary`);
    }

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
                                    {info.name}<br />
                                    <Button variant="outline-primary" size='sm'
                                        onClick={() => {
                                            setActivityDetails(info.id);
                                        }}>
                                        <FontAwesomeIcon icon="info-circle" />
                                    </Button>

                                    <Button variant="outline-primary" size='sm'
                                        onClick={() => {
                                            chooseItinerary(info.id)
                                        }}>
                                        <FontAwesomeIcon icon="plus-square" />
                                    </Button>

                                    <Button variant="outline-primary" size='sm'
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

            <Button variant="primary"
                onClick={() => history.push('/add')}>New Activity</Button>

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