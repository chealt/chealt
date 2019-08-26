const defaultState = {
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
        default:
            return state;
    }
};

export default authentication;
