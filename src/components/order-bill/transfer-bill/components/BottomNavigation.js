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
        const {page} = this.props;

        return (
            <Navbar className="btm-nav px-0" color="dark">
                <Nav className="mr-auto">
                    <NavItem>
                        <RouterLink routeName="OrderBill" params={{ tableId: page.floor.LayoutObjects[0].Id.toString()}} className="nav-link">
                            <span className="icon-back"/>
                            Close
                        </RouterLink>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="javascript:void(0)" onClick={ e => page.onClickDone(e)}
                                    className="nav-link">
                            <span className="icon-save"/>
                            Done
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}