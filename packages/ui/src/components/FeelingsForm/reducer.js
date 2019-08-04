const defaultState = [];

const feelings = (state = defaultState, action) => {
    switch (action.type) {
        case 'FEELINGS.ADD':
            return Array.from(new Set([
                ...state,
                action.feeling
            ]));
        default:
            return state;
    }
};

export default feelings;
