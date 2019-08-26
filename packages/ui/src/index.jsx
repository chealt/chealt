import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { appReducers, mainReducer } from './components/app.reducer';
import App from './components/app';
import { initAppState, initAuthentication } from './components/app.actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    mainReducer(appReducers),
    composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(initAppState());
store.dispatch(initAuthentication());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#app')
);
