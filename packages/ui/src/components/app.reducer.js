import { combineReducers } from 'redux';

import feelings from './FeelingsForm/reducer';

const mainReducer = (reducers, initialState) => {
    const appState = {
        state: initialState
    };

    return (state = undefined, action) => {
        switch (action.type) {
            case 'APP.LOAD':
                appState.state = action.state;

                return appState.state;
            default:
                return appReducers(state, action);
        }
    };
};

const appReducers = combineReducers({
    feelings
});

export { appReducers, mainReducer };
