import React, {Component} from "react";
import {observer} from "mobx-react/index";
import BottomNavigation from "./component/BottomNavigation";
import * as _ from "lodash";

@observer
export default class ServiceStation extends Component {

    render() {
        const {isLoading} = this.props.page;

        if (isLoading) {
            return (
                <div className="loader-wrap">
                    <div className="background-loader"/>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="d-flex flex-column flex-fill">
                    <div className="flex-fill row justify-content-center p-5 ">
                        <table className="table table-sm mb-0">
                            <thead style={{backgroundColor: "#000", color: "#fff"}}>
                            <tr>
                                <th>Table</th>
                                <th>Request</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody className="tab-content">
                            {
                                _.map(_.range(1, 10), (value) => {
                                    return (
                                        <tr>
                                            <td>{value}</td>
                                            <td>{"Service Request"}</td>
                                            <td>{"12 : 00 PM"}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <BottomNavigation page={this.props.page} className="flex-shrink-0"/>
                </div>
            </React.Fragment>
        );
    }
}