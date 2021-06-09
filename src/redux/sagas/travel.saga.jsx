import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* travelSaga() {
    yield takeEvery('FETCH_TRIPS', fetchTrips);
    yield takeEvery('FETCH_ACTIVITIES', fetchActivities);
    yield takeEvery('ADD_TRIP', addTrip);
    yield takeEvery('ADD_ACTIVITY', addActivity)
    yield takeEvery('EDIT_ACTIVITY', editActivity)

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

function* editActivity(action) {
    try {
        yield axios.put('/api/travel', action.payload);
        yield put({ type: 'EDIT_ACTIVITY' });
    } catch (error) {
        console.log(`Error editing activity`, error);
    }
}


export default travelSaga;