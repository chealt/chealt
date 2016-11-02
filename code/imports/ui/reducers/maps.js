const map = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MAP':
            if (state.id !== action.id) {
                return state;
            }
            
            return Object.assign({}, state, { isMapShown: !state.isMapShown });
        default:
            return state;
    }
};

const maps = (state = [], action) => {
    switch (action.type) {
        case 'SET_MAPS':
            return action.maps;
        case 'TOGGLE_MAP':
            return state.map(_map => map(_map, action));
        default:
            return state;
    }
};

export default maps;
