import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {RouterLink} from 'mobx-state-router';
import {
    Nav,
    Navbar,
    NavItem,
    NavLink
} from 'reactstrap';

@observer
export default class BottomNavigation extends Component {
    render() {
        const {className} = this.props;

        return (
            <Navbar className={"btm-nav px-0 " + className} color="dark">
                <Nav className="mr-auto">
                    <NavItem>
                        <NavLink href="#">
                            <span className="icon-back"/>
                            Order
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="mx-auto">
                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-print"/>
                            Print
                        </RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-email"/>
                            Email
                        </RouterLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#">
                            <span className="icon-cash"/>
                            Cash
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}