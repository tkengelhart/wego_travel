const trips = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRIPS':
            return action.payload;
        case 'SET_TRIP_DETAILS':
            console.log('The payload is,', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default trips;
