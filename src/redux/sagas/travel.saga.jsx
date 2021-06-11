import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* travelSaga() {
    // yield takeEvery('SET_TRIP_DETAILS', fetchDetails)

    yield takeEvery('FETCH_TRIPS', fetchTrips);
    yield takeEvery('FETCH_ACTIVITIES', fetchActivities);
    yield takeEvery('ADD_TRIP', addTrip);
    yield takeEvery('ADD_ACTIVITY', addActivity)
    yield takeEvery('EDIT_ACTIVITY', editActivity)
    yield takeEvery('DELETE_ACTIVITY', deleteActivity)

}

function* fetchTrips() {
    // get all trips from the DB
    try {
        const trips = yield axios.get('/api/travel/trips');
        console.log('get all:', trips.data);
        yield put({ type: 'SET_TRIPS', payload: trips.data });

    } catch {
        console.log('get all error');
    }
}

// function* fetchDetails(action) {
//     console.log('action payload is', action.payload.tripId);
//     let tripId = action.payload.tripId;

//     console.log('tripId is ', tripId);
//     try {
//         yield axios.get(`/api/travel/details/${tripId}`);
//         console.log(tripId, action.payload);
//         yield put({ type: 'SET_TRIP_DETAILS' });
//     } catch {
//         console.log('Error getting trip');
//     }
// }

function* fetchActivities() {
    // get all activities from the DB
    try {
        const activities = yield axios.get('/api/travel/activity');
        console.log('get all:', activities.data);
        yield put({ type: 'SET_ACTIVITIES', payload: activities.data });

    } catch {
        console.log('get all error');
    }
}

function* addTrip(action) {
    //add new trip
    try {
        yield axios.post('/api/travel/trip', action.payload);
        yield put({ type: 'FETCH_TRIPS' });
    } catch {
        console.log('Error fetching trips', error);
    }
}

function* addActivity(action) {
    try {
        yield axios.post('/api/travel/activity', action.payload);
        yield put({ type: 'FETCH_ACTIVITIES' });
    } catch (error) {
        console.log(`Error fetching activities`, error);
    }
}

function* deleteActivity(action) {
    console.log('in deleteActivity', action);
    try {
        let id = action.payload
        // debugger;
        yield axios.delete(`/api/travel/${id}/`);
        yield put({ type: 'FETCH_ACTIVITIES' });
    } catch (error) {
        console.log('Error in adding new item', error);
    }
}
function* editActivity(action) {
    console.log('in editActivity', action);
    try {
        let id = action.payload
        // debugger;
        yield axios.put(`/api/travel/edit/${id}/`);
        yield put({ type: 'FETCH_ACTIVITIES' });
    } catch (error) {
        console.log('Error in editing item', error);
    }
}


export default travelSaga;