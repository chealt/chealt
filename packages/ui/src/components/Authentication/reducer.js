const defaultState = {
    isAuthenticated: false,
    inProgress: false
};

const authentication = (state = defaultState, action) => {
    switch (action.type) {
        case 'AUTH.STARTED':
            return {
                ...state,
                inProgress: true
            };
        case 'AUTH.FINISHED':
            return {
                ...state,
                inProgress: false
            };
        case 'AUTH.LOADED':
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            };
        default:
            return state;
    }
};

export default authentication;
