const activities = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVITIES':
            return action.payload;
        case 'SET_ITINERARY_ACTIVITIES':
            return action.payload;
        case 'SET_DETAILS':
            return [...state];
        default:
            return state;
    }
}

export default activities;

