import React, {Component} from "react";
import Slider from "react-slick";
import {Pagination, PaginationLink} from "reactstrap";
import {observer} from "mobx-react";

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style }}
            onClick={onClick}
        >
            <span className="icon-prev"/>
        </button>
    );
}

function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style }}
            onClick={onClick}
        >
            <span className="icon-next"/>
        </button>
    );
}

@observer
export default class MultipleRowSlider extends Component {
    render() {
        const {layoutManager: {slideToShow, slideRows} , page} = this.props;
        const settings = {
            infinite: false,
            //slidesToShow: slideToShow,
            speed: 500,
            rows: slideRows,
            slidesPerRow: slideToShow,
            //slidesToScroll: slideToShow,
            dots: true,
            dotsItemClass: 'page-item',
            dotsItemActiveClass: 'active' ,
            nextArrow: <CustomPrevArrow/>,
            prevArrow: <CustomNextArrow/>,
            appendDots: (dots) => {
                return (
                    <Pagination>
                        {dots}
                    </Pagination>
                )
            },
            customPaging(i) {
                return (
                    <PaginationLink href="#" className="page-item">
                        {i + 1}
                    </PaginationLink>
                )
            }
        };
        return (
            <Slider {...settings}
                    ref={(slider) => {page.menuItemSlider = slider}}
            >
                {this.props.children}
            </Slider>
        );
    }
}