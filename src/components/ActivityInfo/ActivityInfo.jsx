import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Modal, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';



function ActivityInfo() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    dispatch({ type: 'FETCH_ACTIVITIES' });

  }, []);
  const activityList = useSelector(store => store.activities);

  let params = useParams();
  console.log(params);

  let activityId = params.activityId;


  let activity = activityList.find(activity => activity.id === Number(activityId));
  console.log(params.activityId);
  console.log(`found activity: `, activity);

  if (!activity) {
    return <h1>Invalid activity ID</h1>;
  }


  return (
    <Container fluid>

      <Card>
        <Card.Header className="activity-title">{activity.name}</Card.Header>
        <Card.Body className="activity-body">{activity.activity_location}</Card.Body>
        <Card.Link className="activity-footer" href={activity.activity_url}>Website</Card.Link>
      </Card>

      <Button variant="success"
        onClick={() => history.goBack()}>Back</Button>

    </Container >

  )
}
export default ActivityInfo;

