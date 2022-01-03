import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button} from "reactstrap";

@observer
export default class TableGroups extends Component {
    render() {
        const {page, page: {groupedTables}} = this.props;

        return (
            <React.Fragment>
                <div className="table-groups-inner">
                    <h4 className="btn btn-secondary">Groups</h4>
                    {
                        groupedTables.map((value, id) =>
                            <div className="my-2" key={id}>
                                <Button color= { (value.groups.join(',') === page.groupedTableIds.join(',')) ? "primary" : "secondary" }  key={value}
                                        onClick={e => page.onClickGroup(value.groups)}> {value.groups.join(',')} </Button>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>);
    }
}