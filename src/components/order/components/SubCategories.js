import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Nav} from 'reactstrap';
import Slider from "react-slick";

function CustomNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <button
            className={className}
            style={{...style}}
            onClick={onClick}
        >
            <span className="icon-prev"/>
        </button>
    );
}

function CustomPrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <button
            className={className}
            style={{...style}}
            onClick={onClick}
        >
            <span className="icon-next"/>
        </button>
    );
}

@observer
export default class SubCategories extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 2,
            nextArrow: <CustomPrevArrow/>,
            prevArrow: <CustomNextArrow/>,
            ref: (slider) => (this.props.page.subCategoriesSlider = slider)
        };

        return (
            <Nav className="menu-subcategories d-block">
                <Slider {...settings}>
                    {this.props.page.subCategories.map((value, key) => {
                        return <a href="javascript:void(0)" key={key}
                                  className={"nav-link menu-subcategory " + (this.props.page.selectedSubCategory === value.Id ? 'active' : '')}
                                  onClick={e => this.props.page.onSubMenuChange(value)}> {value.Name}</a>
                    })}
                </Slider>
            </Nav>
        );
    }
}