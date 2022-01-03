import React from 'react';
import {observer} from 'mobx-react';
import SquareState from "../../common/SquareState";
import _ from 'lodash';

@observer
export default class Allergies extends React.Component {
    render() {
        const { productNoteStore } = this.props;
        return (
            <div>
                <h4 className="rounded-heading">Allergies</h4>
                <div className="d-flex flex-wrap allergies-list">
                    {productNoteStore.allergies.map((value, key) => {
                        return <SquareState
                            key={key}
                            onClick={ e => productNoteStore.onClickSelectAllergies(value)}
                            parentClassName='square-wrap'
                            className={"square " + (_.indexOf(productNoteStore.orderItem.selectedAllergies, value) > -1 ? 'selected' : '')}>
                            Allergies
                        </SquareState>
                    })
                    }
                </div>
            </div>
        );
    }
}