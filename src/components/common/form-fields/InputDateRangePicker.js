import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class InputDateRangePicker extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        label: PropTypes.string,
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
    };
    static defaultProps = {
        className: 'form-group',
        style: {},
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
        props.onChange({
            target: {
                ...props,
                value: date,
            },
        });
    };

    saveInput = (node) => {
        this.input = node;
    };

    render() {
        const {
            className,
            style,
            label,
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
        } = this.props;

        const classString = error ? 'form-group has-error' : className;

        return (
            <div className={classString}>
                <label style={style} className="control-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
                <DatePicker
                    dateFormat="DD/MM/YYYY"
                    //className="form-control"
                    selected={moment(value)}
                    //onChange={(date) => this.form.start_at = date}
                    name={name}
                    readOnly={readOnly}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    autoFocus={autoFocus}
                    ref={this.saveInput}
                    placeholder={placeholder}
                    required={required}
                    className="form-control"
                />
                <DatePicker
                    dateFormat="DD/MM/YYYY"
                    //className="form-control"
                    selected={moment(value)}
                    //onChange={(date) => this.form.start_at = date}
                    name={name}
                    readOnly={readOnly}
                    disabled={disabled}
                    tabIndex={tabIndex}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    autoFocus={autoFocus}
                    ref={this.saveInput}
                    placeholder={placeholder}
                    required={required}
                    className="form-control"
                />
                <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                />

                <DatePicker
                    selected={this.state.endDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                />
                {error && <p className="help-block">{error}</p>}
            </div>
        );
    }
}