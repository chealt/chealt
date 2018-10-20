const defaultState = {
    currentView: 'home'
};

const views = (state = defaultState, action) => {
    switch (action.type) {
        case 'VIEWS.SWITCH_VIEW':
            return {
                currentView: action.payload
            };
        default:
            return state;
    }
};

export default views;
