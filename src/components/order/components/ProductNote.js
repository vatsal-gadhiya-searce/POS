import React, {Component} from 'react';
import Textarea from "../../common/form-fields/Textarea";
import {observer} from 'mobx-react';
import {Button} from 'reactstrap';
import Input from "../../common/form-fields/Input";
import ModifierItemSection from "./ModifierItemSection";

@observer
export default class ProductNote extends Component {
    render() {
        const {productNoteStore, modifierStore, settingStore} = this.props;
        return (
            <div className="d-flex flex-column product-note mx-auto">
                <div className="d-flex justify-content-between align-items-center product-note-actions">
                    <div>
                        <Button color="danger" size="md" onClick={e => productNoteStore.onClickDeleteItem()}>
                            <span className="icon-trash"/>
                        </Button>
                        <Button color="secondary" size="md">
                            <span className="icon-user"/>
                        </Button>
                        <Button color="secondary" size="md">
                            <span className="icon-home"/>
                        </Button>
                    </div>
                    <Button disabled={modifierStore.hasDisabledDoneButton} color="primary" size="lg" className="align-self-end"
                            onClick={e => productNoteStore.onClickDone()}>Done</Button>
                </div>
                <div className="product-note-quantity d-flex justify-content-between align-items-center mb-3">
                    <label>Quantity</label>
                    <div className="d-flex numeric-field">
                        <Button color="secondary"
                                onClick={e => productNoteStore.onToggleItemQty(true)}>
                            <span className="icon-minus"/></Button>
                        <Input
                            placeholder="Search Product"
                            wrapperClass="align-item-end"
                            autoFocus={true}
                            value={productNoteStore.orderItem.Quantity ? productNoteStore.orderItem.Quantity : 0}
                            onChange={e => productNoteStore.onChangeItemQty(e.target.value)}
                            type="number"
                        />
                        <Button color="secondary" onClick={e => productNoteStore.onToggleItemQty()}>
                            <span className="icon-plus"/>
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="product-note-input">
                        <Textarea
                            autoFocus={true}
                            value={productNoteStore.orderItem.Note ? productNoteStore.orderItem.Note : ''}
                            onChange={e => productNoteStore.orderItem.Note = e.target.value }
                            rows={3}
                            readOnly={false}
                            required={true}
                        />
                        <span className="icon-note"/>
                    </div>
                </div>

                {/*<Allergies productNoteStore={productNoteStore}/>*/}

                {
                    modifierStore.modifiers.map((modifier, key) => {
                        return <ModifierItemSection modifierStore={modifierStore} modifier={modifier} key={key} settingStore={settingStore}/>
                    })
                }

            </div>
        );
    }
}