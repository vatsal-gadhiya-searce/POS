import React from 'react';
import jquery from "jquery";
import Table from "./Table";
import {observer} from 'mobx-react';

@observer
export default class TableLayout extends React.Component {

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

    render() {
        const {page, tables} = this.props;

        return (
            <div className="layout flex-fill">
                {tables.map(table => table.table.IdOperationType !== 3 && table.table.Shape < 3 ?
                    <Table table={table} key={table.table.Id} page={page}/> : null
                )}
            </div>
        );
    }
}