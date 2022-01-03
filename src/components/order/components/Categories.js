import React from 'react';
import {observer} from 'mobx-react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import Slider from "react-slick/lib";


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
export default class Categories extends React.Component {

    render() {
        let {page} = this.props;

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 2,
            nextArrow: <CustomPrevArrow/>,
            prevArrow: <CustomNextArrow/>,
            ref: (slider) => (this.props.page.mainCategorySlider = slider)
        };


        return (
            <Nav className="menu-categories mt-3">
                <Slider {...settings}>
                {
                    page.mainCategories.map((value, key) => {
                        return <NavItem key={key}>
                            <NavLink
                                className={'menu-category ' + (page.selectedMainCategoryTab === value.Id ? 'active' : '')}
                                onClick={() => {
                                    page.toggleMainCategory(value);
                                }}
                            >
                                {value.Name}
                            </NavLink>
                        </NavItem>
                    })
                }
                </Slider>
            </Nav>
        );
    }
}