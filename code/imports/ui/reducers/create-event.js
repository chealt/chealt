const createEvent = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_EVENT_CREATOR':
            return true;
        case 'CLOSE_EVENT_CREATOR':
            return false;
        case 'TOGGLE_EVENT_CREATOR':
            return !state;
        default:
            return state;
    }
};

export default createEvent;