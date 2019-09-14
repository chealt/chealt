const defaultState = {
    inProgress: false,
    sessions: undefined
};

const activities = (state = defaultState, action) => {
    switch (action.type) {
        case 'GOOGLE_FIT.LOADED':
            return {
                inProgress: false,
                sessions: action.sessions
            };
        default:
            return state;
    }
};

export default activities;
