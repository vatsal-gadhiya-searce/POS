import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from "lodash";
import MenuItem from "./MenuItem";
import Input from "../../common/form-fields/Input";
import {Button, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";

@observer
export default class ProductSearch extends Component {
    render() {
        const {page, page: {productSearchStore}} = this.props;
        let OrderedProducts = page.orderObject.OrderedProducts ? page.orderObject.OrderedProducts.filter((product) => product.IdOperationType !== 3) : null;
        return (
            <div className="product-search d-flex flex-column mx-auto">
                <div className="d-flex">
                    <div className="input-group flex-fill">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="icon-search"/>
                            </InputGroupAddon>
                            <Input
                                wrapperClass="flex-fill mb-0"
                                placeholder="Search Product"
                                autoFocus={true}
                                value={productSearchStore.searchString}
                                onChange={e => productSearchStore.onSearchItem(e.target.value)}
                                required={true}
                            />
                            {
                                productSearchStore.searchString ?
                                    <InputGroupAddon addonType="append"
                                                     onClick={e => productSearchStore.onSearchClear()}>
                                        <Button color="light"><span className="icon-close"/></Button>
                                    </InputGroupAddon> : ""
                            }
                        </InputGroup>
                    </div>
                    <Button onClick={e => productSearchStore.onHideSearch(e)} color="primary"
                            className="product-search-btn flex-shrink-0">Done</Button>
                </div>
                <div className="product-results">
                    <h4>Results</h4>
                    <div className="menu-items d-flex flex-wrap mt-1">
                        {productSearchStore.filteredResult && productSearchStore.filteredResult.length ?
                            productSearchStore.filteredResult.map((value, key) => {
                                let selectedProduct = page.combineId ?
                                    _.find(OrderedProducts,{IdProduct: value.Id,IdCombination: page.combineId, IsComboProduct: true})
                                    : _.find(OrderedProducts, {IdProduct: value.Id,IsComboProduct: false});
                                return <MenuItem key={key} product={value} page={page}
                                                 isModifier={value.isModifier}
                                                 selected={selectedProduct}/>
                            }) : <p className="text-center p-3 w-100"> Result Not Found </p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}