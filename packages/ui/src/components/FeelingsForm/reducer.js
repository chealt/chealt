const defaultState = [];

const feelings = (state = defaultState, action) => {
    switch (action.type) {
        case 'FEELINGS.ADD':
            return [
                ...state,
                {
                    id: Date.now(),
                    feeling: action.feeling
                }
            ];
        case 'FEELINGS.LOAD':
            return [...state, action.feelings];
        default:
            return state;
    }
};

export default feelings;
