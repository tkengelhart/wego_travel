const itinerary = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TRIP_DETAILS':
            return action.payload;
        case 'SET_CURRENT_TRIP':
            return action.payload;
        default:
            return state;

    }
}

export default itinerary;
