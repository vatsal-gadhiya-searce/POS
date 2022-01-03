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
        const {page: {settingsStore}} = this.props;

        return (
            <Navbar className="btm-nav px-0" color="dark">
                <Nav className="mr-auto">
                    <NavItem>
                        <RouterLink routeName="login" className="nav-link">
                            <span className="icon-back"/>
                            Close
                        </RouterLink>
                    </NavItem>
                </Nav>
                <Nav className="mx-auto">
                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-service-station"/>
                            Service Station
                        </RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-reservations"/>
                            Reservations
                        </RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-counter-sales"/>
                            Counter Sales
                        </RouterLink>
                    </NavItem>
                    <NavItem>
                        <RouterLink routeName="home" className="nav-link">
                            <span className="icon-take-away"/>
                            Take Away
                        </RouterLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#" onClick={(e) => settingsStore.toggleSettingsModal(e)}>
                            <span className="icon-settings"/>
                            Settings
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}