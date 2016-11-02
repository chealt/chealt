const isDrawerOpen = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return true;
        case 'CLOSE_DRAWER':
            return false;
        case 'TOGGLE_DRAWER':
            return !state;
        default:
            return state;
    }
};

export default isDrawerOpen;