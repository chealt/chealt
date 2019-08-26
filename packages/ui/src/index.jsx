import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { appReducers, mainReducer } from './components/app.reducer';
import App from './components';
import { initAuth } from './components/Authentication/actions';
import { preloadState, saveState } from './components/persist';
import { observeStoreWithout } from './components/redux-utils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    mainReducer(appReducers),
    preloadState(),
    composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(initAuth());
observeStoreWithout(store, ['authentication'], saveState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#app')
);
