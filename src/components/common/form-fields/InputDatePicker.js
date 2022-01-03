import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Error from "./Error";

export default class InputDatePicker extends React.Component {
    static propTypes = {
        wrapperClass: PropTypes.string,
        label: PropTypes.string,
        labelClass: PropTypes.string,
        columnClass: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        dateFormat: PropTypes.string,
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
        minDate: PropTypes.object,
        maxDate: PropTypes.object,
        showTimeSelect: PropTypes.bool,
        showTimeSelectOnly: PropTypes.bool,
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        columnClass: '',
        onFocus() {
        },
        onBlur() {
        },
        onChange() {
        },
    };

    constructor(props) {
        super(props);
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    handleChange = (date) => {
        const {props} = this;
        if (props.disabled) {
            return;
        }

        let value = date ? (props.showTimeSelect) ? date.format('YYYY-MM-DD HH:mm') : date.format('YYYY-MM-DD') : null;
        if(props.showTimeSelectOnly && date){
            value = date.format('HH:mm')
        }
        props.onChange({
            target: {
                ...props,
                value: value,
            },
        });
    };

    saveInput = (node) => {
        this.input = node;
    };

    render() {
        const {
            wrapperClass,
            label,
            labelClass,
            columnClass,
            dateFormat,
            minDate,
            maxDate,
            name,
            placeholder,
            disabled,
            readOnly,
            tabIndex,
            onFocus,
            onBlur,
            onChange,
            autoFocus,
            value,
            error,
            required,
            showTimeSelect,
            showTimeSelectOnly
        } = this.props;

        const classString = error ? 'form-control is-invalid' : 'form-control';
        const wrapperError = error ? columnClass + ' is-invalid' : columnClass;
        let selectedValue = value ? value : null;
        if(showTimeSelectOnly && value){
            selectedValue = moment().format('YYYY-MM-DD')+' '+value;
        }

        return (
            <div className={wrapperClass}>
                { label ?
                        <label className={labelClass}>
                            {label}
                            {required && <span className="required">*</span>}
                        </label>
                        : ''
                }
                <div className={wrapperError}>
                    <DatePicker
                        dateFormat={dateFormat}
                        selected={selectedValue ? moment(selectedValue) : null}
                        name={name}
                        readOnly={readOnly}
                        disabled={disabled}
                        tabIndex={tabIndex}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={this.handleChange}
                        autoFocus={autoFocus}
                        ref={this.saveInput}
                        placeholderText={placeholder}
                        required={required}
                        isClearable={false}
                        className={classString}
                        showTimeSelect={showTimeSelect}
                        showTimeSelectOnly={showTimeSelectOnly}
                        timeFormat='HH:mm'
                    />
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}