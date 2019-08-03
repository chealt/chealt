const defaultState = [];

const feelings = (state = defaultState, action) => {
    switch (action.type) {
        case 'FEELINGS.ADD':
            return [
                ...state.feelings,
                action.feelings
            ];
        default:
            return state;
    }
};

export default feelings;
