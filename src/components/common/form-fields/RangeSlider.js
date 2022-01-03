import React, {Component} from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from "prop-types";
import Error from "./Error";

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            placement="top"
            key={index}
            trigger={['hover']}
            visible={true}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

export default class RangeSlider extends Component {

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
        value: PropTypes.any,
        error: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        required: PropTypes.bool,
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
    }


    handleChange = (value) => {
        const {props} = this;
        if (props.disabled) {
            return;
        }
        props.onChange({
            target: {
                ...props,
                value: value,
            },
        });
    };

    render() {
        const {
            wrapperClass,
            labelClass,
            columnClass,
            label,
            value,
            error,
            required,
            min,
            max,
            step
        } = this.props;

        const classString = error ? 'is-invalid' : '';

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
                    <Slider value={value}
                            min={min}
                            max={max}
                            step={step}
                            onChange={this.handleChange}
                            handle={handle}/>
                    {error && <Error error={error}/>}
                </div>
            </div>
        );
    }

}