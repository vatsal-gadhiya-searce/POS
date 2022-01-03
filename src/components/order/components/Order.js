import React, {Component} from 'react';
import {observer} from 'mobx-react';
import OrderItem from "./OrderItem";
import OrderRoundHeader from "./OrderRoundHeader";
import CombineItem from "./CombineItem";
import HoldOrderItem from "./hold/HoldOrderItem";
import _ from 'lodash';

@observer
export default class Order extends Component {
    render() {
        let {page, page: {combinedItems, generalNote, orderObject, holdProducts}} = this.props;
        orderObject.OrderedProducts  = orderObject.OrderedProducts ? orderObject.OrderedProducts.filter((product)=>product.IdOperationType !== 3) : null;
        return (
            <div className="order-list flex-fill">
                {1 === 0 ? <OrderRoundHeader/> : null}
                {
                    generalNote ?
                        <div className="general-note-item">
                            <h4 onClick={e => page.onShowGeneralNote()}>
                                <span className="icon-note"/>General Note
                            </h4>
                        </div>
                        : ''
                }
                {
                    orderObject.OrderedProducts && orderObject.OrderedProducts.map((value, key) => {
                        let combineObject = combinedItems ? combinedItems.find((combinedItem) => combinedItem.index === key) : [];
                        let currentHoldItem = _.find(holdProducts,{suffix : orderObject.TableSufix});
                        let currentHoldProducts = currentHoldItem ? currentHoldItem.products : [];
                        if(combineObject && value.IdCombination > 0){
                            return <CombineItem page={page} combine={combineObject} object={orderObject} item={value} key={key} />
                        }
                        else if (!value.IdCombination  && _.findIndex(currentHoldProducts,value) <= -1){
                            return <OrderItem page={page} object={orderObject} item={value} key={key} index={key}/>
                        }
                    })
                }
                {
                    holdProducts && holdProducts.length ?
                        holdProducts.map((value, holdKey) => {
                            if (value.suffix === orderObject.TableSufix && value.products.length) {
                                return <React.Fragment key={holdKey}>
                                    <div className="order-header-btm">Hold Order</div>
                                    {
                                        value.products.map((product, key) => {
                                            return <HoldOrderItem page={page} object={orderObject} item={product}
                                                                  key={key}
                                                                  index={key}/>
                                        })
                                    }
                                </React.Fragment>
                            }
                        }) : null
                }
            </div>
        );
    }
}