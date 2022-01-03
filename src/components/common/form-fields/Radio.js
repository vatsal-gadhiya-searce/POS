import React from 'react';
import PropTypes from 'prop-types';
import Error from "./Error";

export default class Radio extends React.Component {
    static propTypes = {
        wrapperClass: PropTypes.string,
        label: PropTypes.string,
        labelClass: PropTypes.string,
        columnClass: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        tabIndex: PropTypes.string,
        readOnly: PropTypes.bool,
        autoFocus: PropTypes.bool,
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        error: PropTypes.string,
        options: PropTypes.any,
        required: PropTypes.bool,
        inline: PropTypes.bool,
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        columnClass: '',
        type: 'radio',
        onChange() {
        },
    };

    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        const {props} = this;
        if (props.disabled) {
            return;
        }
        props.onChange({
            target: {
                ...props,
                value: e.target.value,
            },
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
        });
    };

    saveInput = (node) => {
        this.input = node;
    }

    render() {
        const {
            wrapperClass,
            label,
            labelClass,
            required,
            columnClass,
            name,
            error,
            options,
            value,
            inline
        } = this.props;

        return (
            <div className={wrapperClass}>
                { label ?
                    <legend className={labelClass}>
                        {label}
                        {required && <span className="required">*</span>}
                    </legend>
                    : ''
                }
                <div className={columnClass}>
                    {options.map(radio => {
                        return (
                            <div className={(inline) ? "form-check form-check-inline" : "form-check"} key={radio.value}>
                                <label className="form-check-label">
                                <input
                                    type="radio"
                                    name={name}
                                    checked={value === radio.value}
                                    value={radio.value}
                                    onChange={this.handleChange}
                                    disabled={radio.disabled}
                                    className="form-check-input"
                                />
                                    {radio.label}
                                </label>
                            </div>
                        );
                    })}
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}