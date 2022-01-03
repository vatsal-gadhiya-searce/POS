import React, {Component} from 'react';
import {observer} from 'mobx-react';
import MenuItem from "./MenuItem";
import _ from 'lodash';
import MultipleRowSlider from "./MultipleRowSlider";

@observer
export default class Products extends Component {

    render() {
        const {page, page: {layoutManager, layoutManager: {menuItem}}} = this.props;
        let OrderedProducts = page.orderObject.OrderedProducts ? page.orderObject.OrderedProducts.filter((product) => product.IdOperationType !== 3) : null;
        return (
            <div className="menu-items">
                <MultipleRowSlider layoutManager={layoutManager} page={page}>
                    {menuItem.map((value) => {
                        let combinedItems = OrderedProducts && OrderedProducts.find((product) => product.IdProduct === value.Id && product.IdCombination === page.combineId);
                        let individualItems = OrderedProducts && OrderedProducts.find((product) => product.IdProduct === value.Id && !product.IdCombination);
                        let selectedProduct = page.combineId && page.isCombineProduct ?
                            combinedItems
                            : individualItems;

                        return <MenuItem key={value} product={value} page={page}
                                         isModifier={value.ShowModifiers}
                                         selected={selectedProduct}/>
                    })}
                </MultipleRowSlider>
            </div>
        );
    }
}