import { combineReducers } from 'redux';

import meals from './meals/reducer';

const mainReducer = (reducers, initialState) => {
    const appState = {
        state: initialState
    };

    return (state = {}, action) => {
        switch (action.type) {
            case 'APP.LOAD_STATE':
                appState.state = action.payload;

                return appState.state;
            default:
                return appReducers(state, action);
        }
    };
};

const appReducers = combineReducers({
    meals
});

export {
    appReducers,
    mainReducer
};
