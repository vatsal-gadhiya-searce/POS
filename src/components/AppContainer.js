import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
export default class AppContainer extends Component {
    render() {
        const { rootStore } = this.props;
        const page = rootStore.pageStore.currentPage;

        if(rootStore.pageStore.loading) {
            return <div className="loader-wrap">
                <div className="background-loader"/>
            </div>
        }

        if (!page) {
            return null;
        }

        const pageComponent = React.createElement(page.component, {page, rootStore});

        return <div className="app-container">
            {pageComponent}
        </div>;
    }
}