import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, ButtonGroup} from 'reactstrap';

@observer
export default class ButtonNavigation extends Component {
    render() {
        const {onChange, buttons, buttonLabel, buttonValue, className, activeButton, children} = this.props;

        return (
            <ButtonGroup className={className}>
                {
                    buttons.map(
                        (button, key) => button.IdOperationType!==3 ?
                            <Button
                                color={(button[buttonValue] === activeButton[buttonValue]) ? "primary" : "secondary"}
                                key={key}
                                onClick={() => onChange(button)}>
                                {button[buttonLabel]}
                            </Button>
                            :
                            null
                    )
                }
                {children}
            </ButtonGroup>
        );
    }
}