// Libs
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import initialState from './store/initialState';
import configureStore from './store/configureStore';

import rootSaga from './sagas/index';

import Root from './containers/Root/Root.js';

import classes from './index.scss';

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const root = window.document.createElement('div');

store.runSaga(rootSaga);

root.classList.add(classes.root);

window.document.body.insertBefore(root, window.document.body.firstChild);

render(
	<Root store={store} history={history}/>,
	root
);
