import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';


function ActivityList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const activityInfo = useSelector(store => store.activities);
    console.log('info is', activityInfo);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        dispatch({ type: 'FETCH_ACTIVITIES' });

    }, []);

    const setInfo = (info) => {
        console.log('info is', info)
        console.log('info id is', info.id)
        dispatch({
            type: 'SET_INFO',
            payload: info.id,
        });
        history.push(`/activity/${info.id}`);
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
                    {activityInfo.map(info => {
                        return (
                            <tr key={info.id}>
                                <td>
                                    {info.name}<br />
                                    <Button onClick={() => setInfo(info)}><FontAwesomeIcon icon="info-circle" /></Button>
                                </td>
                                <td>{info.constraints}</td>
                                <td>{info.activity_location}</td>
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