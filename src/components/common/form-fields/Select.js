import React from 'react';
import PropTypes from 'prop-types';
import Error from "./Error";

export default class Select extends React.Component {
    static propTypes = {
        wrapperClass: PropTypes.string,
        label: PropTypes.string,
        labelClass: PropTypes.string,
        columnClass: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        tabIndex: PropTypes.string,
        autoFocus: PropTypes.bool,
        value: PropTypes.any,
        error: PropTypes.string,
        options: PropTypes.any,
        required: PropTypes.bool,
        multi: PropTypes.bool,
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        columnClass: '',
        multi: false,
        onChange() {
        },
    };


    handleChange = (e) => {
        const {props} = this;

        if (props.disabled) {
            return;
        }
        let select = e.target;
        let selectedValue = (props.multi) ? [] : select.value;

        if (props.multi) {
            let options = select.getElementsByTagName('option');

            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) selectedValue.push(options[i].value)
            }
        }

        props.onChange({
            target: {
                ...props,
                value: selectedValue,
            },
        });
    };

    renderOption = (option, optionKey) => {

        return (
            <option key={optionKey} value={option.value}>
                {option.label}
            </option>
        )
    };

    render() {
        const {
            wrapperClass,
            labelClass,
            columnClass,
            label,
            name,
            placeholder,
            value,
            error,
            options,
            required,
            multi,
        } = this.props;


        const classString = error ? 'is-invalid custom-select' : 'custom-select';
        const idString = name ? name : '';

        return (
            <div className={wrapperClass}>
                {label ?
                    <label className={labelClass}>
                        {label}
                        {required && <span className="required">*</span>}
                    </label>
                    : ''
                }
                <div className={columnClass}>
                    <select
                        multiple={multi}
                        name={name}
                        onChange={(e) => this.handleChange(e)}
                        className={classString}
                        id={idString}
                        value={value.slice()}
                    >
                        <option value="" style={{display: 'none'}}>{placeholder}</option>
                        {options.map(this.renderOption)}
                    </select>
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}