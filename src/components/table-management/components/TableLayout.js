import React, {Component} from 'react';
import jquery from "jquery";
import Table from "./Table";
import Shape from "./Shape";
import Line from "./Line";
import _ from "lodash";

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

    renderTable = (table,key) =>{
        shape: 'square/circle/line/shape/default';
        if(table.table.Shape < 3 ){
            return <Table table={table} key={key} page={this.props.page}/>
        }
        if(table.table.Shape > 20 ){
            return <Line line={table} key={key} page={this.props.page}/>
        }
        if(_.inRange(table.table.Shape, 11, 16)){
            return <Shape shape={table} key={key} page={this.props.page}/>
        }
    };

    render() {
        let {tables} = this.props;
        tables = tables.filter(table => table.table.IdOperationType !== 3);

        return (
            <div className="layout flex-fill render-layout">
                {tables.map(this.renderTable )}
            </div>
        );
    }
}