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
        const {page,page: {tableStore}, className} = this.props;

        return (
            <Navbar className={"btm-nav px-0 " + className} color="dark">
                <Nav className="mr-auto">

                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-back"/>
                            Cancel
                        </RouterLink>
                    </NavItem>
                </Nav>
                <Nav className="mx-auto">
                    <NavItem>
                        <NavLink href="#" onClick={e => tableStore.showAddTableModal(1)}>
                            <span className="icon-add-table"/>
                            Table
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={e => tableStore.showAddTableModal(2)}>
                            <span className="icon-add-table-round"/>
                            Table
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={e => tableStore.showAddTableModal(11)}>
                            <span className="icon-add-shape"/>
                            Shape
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={e => tableStore.showAddTableModal(21)}>
                            <span className="icon-add-line"/>
                            Line
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#" onClick={page.onClickSave}>
                            <span className="icon-save"/>
                            Save
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}