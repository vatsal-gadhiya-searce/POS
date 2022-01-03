import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import AppContainer from "./components/AppContainer";

//global styles
import './assets/scss/App.scss';

export default class App extends Component {
    render() {
        return (
            <Provider rootStore={this.props.rootStore}>
                <AppContainer />
            </Provider>
        );
    }
}