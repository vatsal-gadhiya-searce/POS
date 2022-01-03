import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {RouterLink} from "mobx-state-router";

@observer
export default class MenuType extends Component {
    render() {
        const {menuTypeStore, menuTypeStore: {isMenuTypeModal, selectedMenuType} } = this.props.page;

        return (
            <React.Fragment>
                <Modal isOpen={isMenuTypeModal} toggle={e => { menuTypeStore.clearMenuTypeModal() }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => { menuTypeStore.clearMenuTypeModal() }}>
                        Table {menuTypeStore.currentTable.TableName} <span className="table-label ml-1">A</span>
                    </ModalHeader>
                    <ModalBody>
                        <h3 className="modal-subhead">Menu</h3>
                        <div className="menus">
                            { menuTypeStore.menuTypes.map((value, key)  =>{
                                return (
                                    <div className="menu-wrap" key={key} onClick={ e => menuTypeStore.onClickMenuType(value)}>
                                        <div className={ "menu " +  (selectedMenuType === value ? "selected" : '')}>{ value }</div>
                                    </div>
                                )
                            })}
                        </div>
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <RouterLink routeName="NewOrder" params={ {"tableId" : (menuTypeStore.currentTable.Id) ? menuTypeStore.currentTable.Id.toString() : '3612' }} className="btn btn-primary btn-md btn-block">
                            Ok
                        </RouterLink>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}