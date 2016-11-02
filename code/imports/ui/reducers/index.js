import { combineReducers }  from 'redux';

import notification         from './notification';
import isDrawerOpen         from './drawer';
import filter               from './filter';
import isMapShown           from './map';

const appReducers = combineReducers({
    notification,
    isDrawerOpen,
    filter,
    isMapShown
});

export default appReducers;