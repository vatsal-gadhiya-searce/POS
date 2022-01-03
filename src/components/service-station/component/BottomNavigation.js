import React, {Component} from "react";
import {observer} from "mobx-react/index";
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";
import {RouterLink} from "mobx-state-router";

@observer
export default class BottomNavigation extends Component {
    render() {
        return (
            <Navbar className="btm-nav px-0" color="dark">
                <Nav className="mr-auto">
                    <NavItem>
                        <RouterLink routeName="sectionPlan" className="nav-link">
                            <span className="icon-back"/>
                            Tables
                        </RouterLink>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink>
                            <span className="icon-trash"/>
                            Clear All
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}