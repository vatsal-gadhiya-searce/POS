import React, {Component} from 'react';
import PropTypes from "prop-types";
import Error from "./Error";

export class Checkbox extends Component {
    static displayName = 'Checkbox';

    componentWillMount() {
        if (!(this.props && this.props.checkboxGroup)) {
            throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
        }
    }

    render() {
        const {checkboxGroup: {name, checkedValues, onChange, inline}, label, ...rest} = this.props;
        const optional = {};
        if (checkedValues) {
            optional.checked = (checkedValues.indexOf(this.props.value) >= 0);
        }
        if (typeof onChange === 'function') {
            optional.onChange = onChange.bind(null, this.props.value);
        }
        return (
            <div className={(inline) ? "form-check form-check-inline" : "form-check"}>
                <label className="form-check-label">
                    <input
                        {...rest}
                        type="checkbox"
                        name={name}
                        disabled={this.props.disabled}
                        {...optional}
                        className="form-check-input"
                    />
                    {label}
                </label>
            </div>
        );
    }
}


export class CheckboxGroup extends Component {
    static displayName = 'CheckboxGroup';

    static propTypes = {
        wrapperClass: PropTypes.string,
        label: PropTypes.string,
        labelClass: PropTypes.string,
        columnClass: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        tabIndex: PropTypes.string,
        value: PropTypes.any,
        error: PropTypes.string,
        options: PropTypes.array,
        required: PropTypes.bool,
        inline: PropTypes.bool,
    };
    static defaultProps = {
        wrapperClass: 'form-group',
        labelClass: 'control-label',
        columnClass: '',
        onChange() {
        },
    };

    constructor(props) {
        super(props);
        this._isControlledComponent = this._isControlledComponent.bind(this);
        this._onCheckboxChange = this._onCheckboxChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.state = {
            value: this.props.value || this.props.defaultValue || []
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.value) {
            this.setState({
                value: newProps.value
            });
        }
    }

    _prepareBoxes = (children) => {
        const checkboxGroup = {
            name: this.props.name,
            checkedValues: this.state.value,
            onChange: this._onCheckboxChange,
            inline: this.props.inline
        };

        return children.map((child, key) => {
            return <Checkbox key={key} text={child.text} value={child.value} checkboxGroup={checkboxGroup}/>
        });
    };

    render() {
        const {
            wrapperClass,
            label,
            labelClass,
            required,
            columnClass,
            error,
            options,
        } = this.props;

        return (
            <div className={wrapperClass}>
                {label ?
                    <legend className={labelClass}>
                        {label}
                        {required && <span className="required">*</span>}
                    </legend>
                    : ''
                }
                <div className={columnClass}>
                    {this._prepareBoxes(options)}
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }

    getValue() {
        return this.state.value;
    }

    _isControlledComponent() {
        return Boolean(this.props.value);
    }

    _onCheckboxChange(checkboxValue, event) {
        let newValue;
        if (event.target.checked) {
            newValue = this.state.value.concat(checkboxValue);
        } else {
            newValue = this.state.value.filter(v => v !== checkboxValue);
        }

        if (this._isControlledComponent()) {
            this.setState({value: this.props.value});
        } else {
            this.setState({value: newValue});
        }

        if (typeof this.props.onChange === 'function') {
            const {props} = this;
            props.onChange({
                target: {
                    ...props,
                    value: newValue,
                },
                stopPropagation() {
                    event.stopPropagation();
                },
                preventDefault() {
                    event.preventDefault();
                },
            });
        }
    }
}