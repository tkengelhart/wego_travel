const trips = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRIPS':
            return action.payload;
        case 'SET_TRIP_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default trips;
