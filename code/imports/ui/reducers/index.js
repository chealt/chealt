import { combineReducers }  from 'redux';

import notification         from './notification';
import isDrawerOpen         from './drawer';
import filter               from './filter';
import events               from './events';
import profile              from './profile';

const appReducers = combineReducers({
    notification,
    isDrawerOpen,
    filter,
    events,
    profile
});

export default appReducers;