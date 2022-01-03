import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
    static propTypes = {
        error: PropTypes.string,
    };

    render() {
        const {
            error,
        } = this.props;

        return (
            <p className="invalid-feedback">{error}</p>
        )
    }
}