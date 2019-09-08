const defaultState = {
    inProgress: false,
    items: undefined
};

const activities = (state = defaultState, action) => {
    switch (action.type) {
        case 'ACTIVITIES.LOADED':
            return {
                inProgress: false,
                items: [...state.items, ...action.activities]
            };
        default:
            return state;
    }
};

export default activities;
