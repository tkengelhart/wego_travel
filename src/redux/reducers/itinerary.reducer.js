const itinerary = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRIP_DETAILS':
            return [...state], action.payload;
        default:
            return state;
    }
}

export default itinerary;