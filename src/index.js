import React from 'react';
import ReactDOM from 'react-dom';
import { HistoryAdapter } from 'mobx-state-router';
import { RootStore } from './stores/RootStore';
import { history } from './utils/history';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const rootStore = new RootStore(window.localStorage);
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

ReactDOM.render(
    <App rootStore={rootStore}/>,
    document.getElementById('root')
);

registerServiceWorker();