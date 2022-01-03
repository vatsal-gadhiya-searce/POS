import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    className:      PropTypes.string,
    children:       PropTypes.node,
    disabled:       PropTypes.bool,
    icon:           PropTypes.node,
    loading:        PropTypes.bool,
    spinColor:      PropTypes.string,
};

function ButtonLoader({
                          className   = 'btn btn-primary',
                          children  = null,
                          disabled  = false,
                          iconStyle = {
                              fontSize: '16px',
                              verticalAlign: 'middle'
                          },
                          loading   = false,
                          ...rest,
                      }) {
    function renderIcon() {
        if (loading) {
            return <span> <i className="fa fa-spinner fa-pulse"/> {children} </span>
        }

        return children;
    }

    const buttonDisabled = disabled || loading;

    return (
        <button className={className} disabled={buttonDisabled} {...rest}>
            {renderIcon()}
        </button>
    );
}

ButtonLoader.propTypes = propTypes;

export default ButtonLoader;

export { ButtonLoader};