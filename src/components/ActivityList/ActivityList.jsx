import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import NewActivity from '../NewActivity/NewActivity';
import AddActivity from '../AddActivity/AddActivity';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import EditActivityInfo from '../EditActivityInfo/EditActivityInfo';


function ActivityList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);
    console.log('info is', activities);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShow(false);
    const handleCloseEdit = () => setShow(true);

    const [showAdd, setShowAdd] = useState(false);
    const handleShowAdd = () => setShow(false);
    const handleCloseAdd = () => setShow(true);

    const [showNew, setShowNew] = useState(false);
    const handleShowNew = () => setShow(false);
    const handleCloseNew = () => setShow(true);



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

    const editActivity = (activityId) => {
        dispatch({
            type: 'EDIT_ACTIVITY',
            payload: activityId
        })
        history.push(`/activity/${activityId}`)

    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);




    return (
        <>
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
                                                handleShow();
                                                setActivityDetails(info.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon="info-circle" /></Button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Body><ActivityInfo /></Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Button variant="outline-primary" size='sm' onClick={handleShowEdit}> <FontAwesomeIcon icon="edit" /></Button>
                                        <Modal show={showEdit} onHide={handleClose}>
                                            <Modal.Body><EditActivityInfo /></Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>

                                    <td>
                                        {info.constraints}
                                    </td>
                                    <td>
                                        {info.activity_location}
                                    </td>
                                    <td>
                                        <Button variant="outline-primary" size='sm' onClick={handleShowAdd}>
                                            <FontAwesomeIcon icon="plus-square" />
                                        </Button>
                                    </td>

                                    <td><Button variant="outline-primary" size='sm' onClick={(event) => deleteActivity(info.id)}><FontAwesomeIcon icon="trash-alt" /></Button></td>
                                </tr>)
                        })}
                    </tbody>
                </Table >

                <Button variant="primary" onClick={handleShowNew}>New Activity</Button>
                <Modal show={showNew} onHide={handleClose}>
                    <Modal.Body><NewActivity /></Modal.Body>

                </Modal>

            </Container >
        </>
    );
}



export default ActivityList;


