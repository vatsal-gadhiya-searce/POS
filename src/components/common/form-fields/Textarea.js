import React from 'react';
import PropTypes from 'prop-types';
import Error from "./Error";

export default class Textarea extends React.Component {
    static propTypes = {
        wrapperClass: PropTypes.string,
        label: PropTypes.string,
        labelClass: PropTypes.string,
        columnClass: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        tabIndex: PropTypes.string,
        readOnly: PropTypes.bool,
        autoFocus: PropTypes.bool,
        value: PropTypes.any,
        required: PropTypes.bool,
        error: PropTypes.string,
        rows: PropTypes.number
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        columnClass: '',
        rows: 10,
        onFocus() {
        },
        onBlur() {
        },
        onChange() {
        },
    };

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
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
            columnClass,
            name,
            placeholder,
            disabled,
            readOnly,
            tabIndex,
            onFocus,
            onBlur,
            autoFocus,
            value,
            error,
            required,
            rows
        } = this.props;

        const classString = error ? 'is-invalid form-control' : 'form-control';

        return (
            <div className={wrapperClass}>
                { label ?
                    <label className={labelClass}>
                        {label}
                        {required && <span className="required">*</span>}
                    </label>
                    : ''
                }
                <div className={columnClass}>
                <textarea name={name}
                          readOnly={readOnly}
                          disabled={disabled}
                          tabIndex={tabIndex}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onChange={this.handleChange}
                          autoFocus={autoFocus}
                          ref={this.saveInput}
                          value={value}
                          placeholder={placeholder}
                          required={required}
                          rows={rows}
                          className={classString}
                />
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}