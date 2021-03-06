import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* travelSaga() {
    yield takeEvery('SET_TRIP_DETAILS', fetchDetails);
    yield takeEvery('FETCH_TRIPS', fetchTrips);
    yield takeEvery('FETCH_ACTIVITIES', fetchActivities);
    yield takeEvery('ADD_TRIP', addTrip);
    yield takeEvery('ADD_ACTIVITY', addActivity);
    yield takeEvery('EDIT_ACTIVITY_ITINERARY', editActivityInfo);
    yield takeEvery('DELETE_ACTIVITY', deleteActivity);
    yield takeEvery('ADD_TO_ITINERARY', chooseItinerary);
    yield takeEvery('EDIT_ACTIVITY_INFO', editActivity);

}

function* fetchDetails(action) {
    //get trips from DB based on query
    try {
        const itineraryResponse = yield axios.get(`/api/travel/details/${action.payload.id}`);
        console.log('payload for trip details is', action.payload);
        console.log('itin response is', itineraryResponse)
        yield put({ type: 'LOAD_TRIP_DETAILS', payload: itineraryResponse.data });
    } catch {
        console.log('get all errors');
    }
}

function* chooseItinerary(action) {
    //add an activity to chosen itinerary
    try {
        const chosenTrip = yield axios.post(`api/travel/additinerary`, action.payload);
        console.log('payload for chosen itinerary is', action.payload);
        yield put({ type: 'SET_TRIPS' });
    } catch (error) {
        console.log('Error adding to itinerary', error);
    }
}
function* editActivityInfo(action) {
    //edit time and date of activity after its in itinerary
    try {
        console.log('action payload is', action.payload);
        yield axios.put(`/api/travel/activityupdate`, action.payload);
        console.log('payload for activity info is', action.payload);
        yield put({ type: 'FETCH_TRIPS' });
        yield put({ type: 'RESET_ITINERARY_ACTIVITY' });

    } catch (error) {
        console.log('Error editing info.', error);
    }
}

function* editActivity(action) {
    //edit time and date of activity after its in itinerary
    try {
        console.log('action payload is', action.payload);
        yield axios.put(`/api/travel/edit`, action.payload);
        console.log('payload for activity info is', action.payload);
        yield put({ type: 'FETCH_ACTIVITIES' });
        yield put({ type: 'RESET_ACTIVITIES' });
    } catch (error) {
        console.log('Error editing info.', error);
    }
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
        yield axios.post('/api/travel/add', action.payload);
        yield put({ type: 'FETCH_ACTIVITIES' });
    } catch (error) {
        console.log(`Error fetching activities`, error);
    }
}

function* deleteActivity(action) {
    console.log('in deleteActivity', action);
    console.log('payload is', action.payload);
    try {
        const deleteId = yield axios.delete(`/api/travel/${action.payload}`);
        yield put({ type: 'FETCH_ACTIVITIES' });
    } catch (error) {
        console.log('Error deleting item', error);
    }
}

export default travelSaga;

// function* editActivity(action) {
//     console.log('in editActivity', action);
//     try {
//         let id = action.payload
//         // debugger;
//         yield axios.put(`/api/travel/edit/${id}/`);
//         yield put({ type: 'FETCH_ACTIVITIES' });
//     } catch (error) {
//         console.log('Error in editing item', error);
//     }
// }