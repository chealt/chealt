const initialState = {
    filter: '',
    isFiltered: false
};

const filter = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return {
                filter: action.filter,
                isFiltered: Boolean(action.filter)
            };
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
};

export default filter;