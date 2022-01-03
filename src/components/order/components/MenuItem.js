import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class MenuItem extends Component {
    render() {
        const {product, page, selected, isModifier} = this.props;

        return (
            <React.Fragment>
                {isModifier ?
                    <div className="menu-item-wrap" onClick={e => page.onClickShowModifier()}>
                        <div className="menu-item modifier">Modifiers</div>
                    </div>
                    :
                    <div className="menu-item-wrap" onClick={e => page.onClickProduct(product)}>
                        <div className={"menu-item " + (selected ? 'selected' : '')}>
                            {product.Name}
                            {selected ? <span className="menu-item-count">x{selected.Quantity}</span> : ''}
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}