import React, {Component} from 'react';
import jquery from "jquery";
import Table from "./Table";
import Shape from "./Shape";
import Line from "./Line";
import {observer} from 'mobx-react';
import _ from "lodash";

@observer
export default class TableLayout extends Component {

    static getLayoutDimensions() {
        return {
            width: jquery('.layout').width(),
            height: jquery('.layout').height()
        };
    }

    onResize = () => {
        const layoutDimensions = TableLayout.getLayoutDimensions();
        this.props.page.floorWidth = layoutDimensions.width;
        this.props.page.floorHeight = layoutDimensions.height;
    };

    componentDidMount() {
        jquery(window).resize(this.onResize);

        const intervalId = setInterval(() => {
            const layoutDimensions = TableLayout.getLayoutDimensions();
            if (layoutDimensions.height > 0) {
                this.props.page.floorWidth = layoutDimensions.width;
                this.props.page.floorHeight = layoutDimensions.height;
                clearInterval(intervalId);
            }
        }, 10);
    }

    componentDidUnMount() {
        jquery(window).off('resize', (this.onResize));
    }

    renderTable = (table, key) =>{
        let status = this.props.page.objectStatus && this.props.page.objectStatus.find((object) => object.IdObject === table.table.Id);
        if(table.table.Shape < 3 ){
            return <Table table={table} status={status} key={key} page={this.props.page}/>
        }
        if(table.table.Shape > 20 ){
            return <Line line={table} status={status} key={key} page={this.props.page}/>
        }
        if(_.inRange(table.table.Shape, 11, 16)){
            return <Shape shape={table} status={status} key={key} page={this.props.page}/>
        }
    };

    render() {
        let {tables} = this.props;
        tables = tables.filter(table => table.table.IdOperationType !== 3);

        return (
            <div className="layout flex-fill">
                {tables.map(this.renderTable )}
            </div>
        );
    }
}