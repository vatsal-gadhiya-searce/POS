import React from 'react';
import PropTypes from 'prop-types';
import Error from "./Error";
import Switch from "react-switch";
import _ from 'lodash';

export default class InputSwitch extends React.Component {
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
        checkBoxText: PropTypes.string,
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
        const checked =  props.value ? props.value : props.defaultChecked;
        this.state = {
            checked,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                checked: nextProps.value ? nextProps.value : nextProps.defaultChecked,
            });
        }
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }
    handleChange(checked) {
        const {props} = this;
        if (props.disabled) {
            return;
        }
        if (!('checked' in props)) {
            this.setState({
                checked: checked,
            });
        }
        props.onChange({
            target: {
                ...props,
                value: checked,
            },
        });
    }

    saveInput = (node) => {
        this.input = node;
    }

    render() {
        const {
            wrapperClass,
            label,
            labelClass,
            columnClass,
            checkBoxText,
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
                    <Switch
                        onChange={this.handleChange}
                        checked={checked}
                        id="normal-switch"
                    />
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}