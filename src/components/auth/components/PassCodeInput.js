import React from "react";
import Input from "../../common/form-fields/Input";
import {observer} from 'mobx-react';

@observer
export default class PassCodeInput extends React.Component {
    render() {
        const {className,page} = this.props;
        return (
            <div className={"d-flex " + (className ? className : "")}>
                {
                    [1, 2, 3, 4].map((value, index) => {
                        return <div key={index} className="pass-input">
                            <Input
                                type="password"
                                value={page.formData.password.charAt(index) || ''}
                                disabled
                            />
                        </div>
                    })
                }
            </div>
        );
    }
}