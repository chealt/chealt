import { combineReducers }  from 'redux';

import notification         from './notification';
import isDrawerOpen         from './drawer';

const appReducers = combineReducers({
    notification,
    isDrawerOpen
});

export default appReducers;