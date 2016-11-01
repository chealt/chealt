import { combineReducers }  from 'redux';

import notification         from './notification';

const appReducers = combineReducers({
    notification
});

export default appReducers;