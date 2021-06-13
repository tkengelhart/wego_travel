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
import EditActivity from '../EditActivity/EditActivity';


function ActivityList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activities = useSelector(store => store.activities);
    console.log('info is', activities);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteActivity = (infoId) => {
        console.log('id is', infoId);
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: infoId,
        });
    }

    const editActivity = (infoId) => {
        dispatch({
            type: 'EDIT_ACTIVITY',
            payload: infoId,
        })
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });
    }, []);


    // const setInfo = (info) => {
    //     console.log('info is', info)
    //     console.log('info id is', info.id)
    //     dispatch({
    //         type: 'SET_INFO',
    //         payload: info.id,
    //     });
    //     history.push(`/activity/${info.id}`);
    // }

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
                                        <Button variant="outline-primary" size='sm' onClick={handleShow}><FontAwesomeIcon icon="info-circle" /></Button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Body><ActivityInfo /></Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Button variant="outline-primary" size='sm' onClick={handleShow}> <FontAwesomeIcon icon="edit" /></Button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Body><EditActivity /></Modal.Body>
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
                                        <Button variant="outline-primary" size='sm' onClick={handleShow}>
                                            <FontAwesomeIcon icon="plus-square" />
                                        </Button>
                                    </td>

                                    <td><Button variant="outline-primary" size='sm' onClick={(event) => deleteActivity(info.id)}><FontAwesomeIcon icon="trash-alt" /></Button></td>
                                </tr>)
                        })}
                    </tbody>
                </Table >
                <Button variant="primary" onClick={handleShow}>New Activity</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body><AddActivity /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container >
        </>
    );
}
export default ActivityList;
