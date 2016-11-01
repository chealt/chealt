import { combineReducers }  from 'redux';

import notification         from './notification';
import isDrawerOpen         from './drawer';
import filter               from './filter';

const appReducers = combineReducers({
    notification,
    isDrawerOpen,
    filter
});

export default appReducers;