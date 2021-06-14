const itinerary = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TRIP_DETAILS':
            return action.payload;
        default:
            return state;

    }
}

export default itinerary;
