import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class EditLine extends Component {
    render() {
        const { page: {isLoading} } = this.props;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                EditLine
            </div>
        );
    }
}