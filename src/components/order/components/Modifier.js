import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button} from "reactstrap";
import ModifierItemSection from "./ModifierItemSection";

@observer
export default class Modifier extends Component {
    render() {
        const {modifierStore, settingStore} = this.props;
        return (
            <div className="d-flex flex-column modifier-wrap mx-auto">
                <div className="d-flex justify-content-between align-items-center modifier-actions">
                    <div />
                    <Button color="primary" size="lg"
                            onClick={e => modifierStore.onClickDone()}
                            disabled={modifierStore.hasDisabledDoneButton}>Done</Button>
                </div>
                {
                    modifierStore.modifiers.map((modifier, key) => {
                        return <ModifierItemSection modifierStore={modifierStore} modifier={modifier} key={key} settingStore={settingStore}/>
                    })
                }
            </div>
        );
    }
}