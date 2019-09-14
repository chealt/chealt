const defaultState = {
    isAuthenticated: false,
    inProgress: false,
    authType: undefined,
    accessToken: undefined
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
                isAuthenticated: action.isAuthenticated,
                authType: action.authType,
                accessToken: action.accessToken
            };
        default:
            return state;
    }
};

export default authentication;
