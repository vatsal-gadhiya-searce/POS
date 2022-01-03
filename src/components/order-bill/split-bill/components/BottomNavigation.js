import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
    Nav,
    Navbar,
    NavItem,
    NavLink
} from 'reactstrap';

@observer
export default class BottomNavigation extends Component {

    render() {
        const {className, page} = this.props;

        return (
            <Navbar className={"btm-nav px-0 " + className} color="dark">
                <Nav className="mr-auto">
                    <NavItem>
                        <NavLink href="#">
                            <span className="icon-back"/>
                            Payment
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#" onClick={page.addBill}>
                            <span className="icon-plus"/>
                            Add
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}