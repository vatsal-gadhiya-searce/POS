import React, {Component} from 'react';

export default class Link extends Component {
    onClick = (e) => {
        if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            if (this.props.onClick) {
                this.props.onClick();
            } else {
                if(this.props.target === '_blank'){
                    window.open('/' + this.props.page.path);
                } else {
                    //router.navigate(this.props.page.path);
                }
            }
        }
    };

    render() {
        let {page, children, className, id} = this.props;

        return <a
            href={'/' + page.path}
            onClick={this.onClick}
            className={className}
            id={id}
        >
            {children}
        </a>
    }
}