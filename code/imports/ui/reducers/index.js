import { combineReducers }  from 'redux';

import notification         from './notification';
import isDrawerOpen         from './drawer';
import filter               from './filter';
import events               from './events';
import profile              from './profile';
import createEvent          from './create-event';

const appReducers = combineReducers({
    notification,
    isDrawerOpen,
    filter,
    events,
    profile,
    createEvent
});

export default appReducers;