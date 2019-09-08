const defaultState = [];

const sortById = (a, b) => a.id - b.id;

const feelings = (state = defaultState, action) => {
    switch (action.type) {
        case 'FEELINGS.ADD':
            return [
                {
                    id: Date.now(),
                    feeling: action.feeling
                },
                ...state
            ];
        case 'FEELINGS.LOAD':
            return [...state, action.feelings.sort(sortById)];
        default:
            return state;
    }
};

export default feelings;
