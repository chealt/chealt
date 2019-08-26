const defaultState = [];

const feelings = (state = defaultState, action) => {
    switch (action.type) {
        case 'FEELINGS.ADD':
            return Array.from(new Set([
                ...state,
                action.feeling
            ]));
        case 'FEELINGS.LOAD':
            return Array.from(new Set([
                ...state,
                action.feelings
            ]));
        default:
            return state;
    }
};

export default feelings;
