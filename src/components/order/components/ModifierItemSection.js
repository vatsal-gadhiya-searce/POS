import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from "lodash";
import SquareState from "../../common/SquareState";

@observer
export default class ModifierItemSection extends Component {
    render() {
        const {modifierStore, modifier, settingStore} = this.props;
        return (
            <div className="modifier-list-wrap">
                <h4 className="rounded-heading bg-secondary mr-2">{modifier.Title}</h4>
                <span>
                {
                    modifierStore.getModifierType(modifier)
                }
                </span>
                <div className="d-flex flex-wrap modifier-list">
                    {
                        modifier.ProductModifierItems ? modifier.ProductModifierItems.map((value, key) => {
                            let sameItemIndex = -1;
                            let sameModifierIndex = _.findIndex(modifierStore.selectedModifier,{IdProductModifier : modifier.IdProductModifier});
                            if(sameModifierIndex > -1){
                                sameItemIndex = modifierStore.selectedModifier[sameModifierIndex].ProductModifierItems.findIndex(productItem =>
                                    productItem.Name === value.Name || productItem.Description === value.Name);
                            }
                            return <SquareState
                                key={key}
                                onClick={e => modifierStore.onClickModifierItem(modifier, value)}
                                parentClassName='square-wrap'
                                className={"square" + ( sameItemIndex > -1 ? ' selected' : '')}>
                                {value.Name}
                                <br/>
                                {settingStore.applicationSettings.CurrencySign} {value.Price}
                            </SquareState>

                        }):null
                    }
                </div>
            </div>
        );
    }
}