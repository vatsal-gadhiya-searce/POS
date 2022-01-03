import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class RoundedRectangle extends Component {

    render() {
        const {onClick, children, className, activeButton} = this.props;

        return (
            <a href="#"
               className={ "nav-link menu-subcategory " + className + " " + (activeButton ? 'active' : '') }
               onClick={ e => (onClick) ? onClick(e) : console.log(e) }>
                { children}
            </a>
        );
    }
}