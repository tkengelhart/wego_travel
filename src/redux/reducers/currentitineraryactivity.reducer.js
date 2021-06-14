const currentitineraryactivity = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ITINERARY_ACTIVITY':
            return action.payload;
        case 'UPDATE_ACTIVITY_DETAILS':
            return action.payload;
        case 'RESET_ITINERARY_ACTIVITY':
            return [];
        case 'RESET_ACTIVITIES':
            return [];
        default:
            return state;

    }
}

export default currentitineraryactivity;