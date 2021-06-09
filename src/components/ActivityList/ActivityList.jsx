import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, CardDeck, CardGroup, CardImg, Container } from 'react-bootstrap';
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

    // const setMovieGenre = (genre) => {
    //   dispatch({
    //     type: 'SET_GENRES',
    //     payload: genre,
    //   });
    // }
    // //trying something from stack overflow
    // const sampleStyle = {
    //   minWidth: "30%",
    //   flexGrow: 0,
    // };



    return (

        <Container>
            <ul>
                {activities.map(activity => {
                    return (
                        <li key={activity.id}>{activity.name}</li>
                    )
                })}

            </ul>
        </Container >
    );
}
export default ActivityList;