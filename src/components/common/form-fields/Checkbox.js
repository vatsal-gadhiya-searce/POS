import React from 'react';
import PropTypes from 'prop-types';
import Error from "./Error";

export default class Checkbox extends React.Component {
    static propTypes = {
        wrapperClass: PropTypes.string,
        label: PropTypes.string,
        labelClass: PropTypes.string,
        columnClass: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        disabled: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        tabIndex: PropTypes.string,
        readOnly: PropTypes.bool,
        autoFocus: PropTypes.bool,
        value: PropTypes.any,
        error: PropTypes.string,
        text: PropTypes.string,
        required: PropTypes.bool,
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        columnClass: '',
        type: 'checkbox',
        defaultChecked: false,
        onFocus() {
        },
        onBlur() {
        },
        onChange() {
        },
    };

    constructor(props) {
        super(props);

        const checked = 'value' in props ? props.value : props.defaultChecked;

        this.state = {
            checked,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                checked: nextProps.value,
            });
        }
    }

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
        if (!('checked' in props)) {
            this.setState({
                checked: e.target.checked,
            });
        }
        props.onChange({
            target: {
                ...props,
                value: e.target.checked,
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
            text,
            name,
            type,
            disabled,
            readOnly,
            tabIndex,
            onClick,
            onFocus,
            onBlur,
            autoFocus,
            value,
            error,
            required
        } = this.props;

        const {checked} = this.state;
        const classString = error ? 'is-invalid form-check-input' : 'form-check-input';

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
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                name={name}
                                type={type}
                                readOnly={readOnly}
                                disabled={disabled}
                                tabIndex={tabIndex}
                                checked={!!checked}
                                onClick={onClick}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onChange={this.handleChange}
                                autoFocus={autoFocus}
                                ref={this.saveInput}
                                value={value}
                                className={classString}
                            />
                            {text}
                        </label>
                    </div>
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}