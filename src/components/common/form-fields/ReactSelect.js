import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Error from "./Error";
import _ from 'lodash';

export default class ReactSelect extends React.Component {
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
        creatable: PropTypes.bool,
        allowToCreateNew: PropTypes.bool,
        createNewRPC: PropTypes.any,
        searchable: PropTypes.bool,
        clearable: PropTypes.bool
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        columnClass: '',
        multi: false,
        creatable: false,
        allowToCreateNew: false,
        searchable : true,
        clearable : true,
        onChange() {
        },
    };

    handleChange = (value) => {
        const {props} = this;

        if (props.disabled) {
            return;
        }
        let selectedValue = (props.multi || props.creatable) ? _.map(value, 'value') : (value) ? value.value : '';
        if (props.belongsTo && selectedValue) {
            selectedValue = {
                id: selectedValue
            };
        }
        if (props.belongsToMany && selectedValue) {
            selectedValue = _.map(selectedValue, function (value) {
                return {id: value};
            })
        }
        props.onChange({
            target: {
                ...props,
                value: selectedValue,
            },
        });
    };

    handleClick(e) {
        const {props} = this;

        if (props.disabled) {
            return;
        }
        props.onChange({
            target: {
                ...props,
                value: 'create-new-rpc',
            },
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
        });
    };

    renderAddNewButton() {
        return (
            <button className="btn btn-success" onClick={(e) => this.handleClick(e)}>
                <span className="fa fa-plus"/>
            </button>
        )
    }

    render() {
        const {
            wrapperClass,
            labelClass,
            columnClass,
            label,
            id,
            name,
            placeholder,
            disabled,
            tabIndex,
            autoFocus,
            value,
            error,
            options,
            required,
            multi,
            creatable,
            allowToCreateNew,
            createNewRPC,
            belongsTo,
            belongsToMany,
            searchable,
            clearable
        } = this.props;


        const classString = error ? 'is-invalid' : '';
        const idString = name ? name : '';

        let addNewButtonComponent = null;
        if (allowToCreateNew) {
            addNewButtonComponent = this.renderAddNewButton();
        }
        let selectedValue = value;
        if (belongsTo && selectedValue) {
            selectedValue = value.id;
        }
        if (belongsToMany && selectedValue) {
            selectedValue = _.map(selectedValue, 'id');
        }

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
                    {(creatable) ?
                        <Select.Creatable
                            multi={true}
                            name={name}
                            options={options.slice()}
                            tabIndex={tabIndex}
                            onChange={this.handleChange}
                            value={selectedValue.slice()}
                            placeholder={placeholder}
                            closeOnSelect={true}
                            className={classString}
                            disabled={disabled}
                            autoFocus={autoFocus}
                            clearable={clearable}
                            searchable={searchable}
                            id={idString}
                        />
                        :
                        <Select
                            multi={multi}
                            name={name}
                            options={options.slice()}
                            tabIndex={tabIndex}
                            onChange={this.handleChange}
                            value={(multi) ? selectedValue.slice() : selectedValue}
                            placeholder={placeholder}
                            closeOnSelect={true}
                            className={classString}
                            disabled={disabled}
                            autoFocus={autoFocus}
                            clearable={clearable}
                            searchable={searchable}
                            id={idString}
                        />
                    }
                    {addNewButtonComponent}
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }
}