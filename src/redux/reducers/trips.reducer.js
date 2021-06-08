const trips = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRIPS':
            return action.payload;
        default:
            return state;
    }
}