import React from 'react';
import {observer} from 'mobx-react';
import {RouterLink} from 'mobx-state-router';
import {
    Nav,
    Navbar,
    NavItem,
    NavLink
} from 'reactstrap';

@observer
export default class BottomNavigation extends React.Component {
    render() {
        const {page, page: {customItemModalStore, productSearchStore}, className} = this.props;

        return (
            <Navbar className={"btm-nav px-0 " + className} color="dark">
                <Nav className="mr-auto">
                    <NavItem>
                        <RouterLink routeName="sectionPlan" className="nav-link">
                            <span className="icon-back"/>
                            Tables
                        </RouterLink>
                    </NavItem>
                </Nav>
                <Nav className="mx-auto">
                    <NavItem>
                        <NavLink href="#" className="nav-link" onClick={e => page.onShowGeneralNote()}>
                            <span className="icon-note"/>
                            Note
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" className="nav-link" onClick={customItemModalStore.onClickShowCustomItem}>
                            <span className="icon-price"/>
                            Price
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" className="nav-link" onClick={e => productSearchStore.onClickSearch(e)}>
                            <span className="icon-search"/>
                            Search
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#" className={"with-icon " + (page.isCombineProduct ? 'active' : '')}
                                 onClick={e => page.onToggleCombineProduct(e)}>
                            <span className="icon-link icon-rounded"/>
                            Combine
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}