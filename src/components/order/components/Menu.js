import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Products from "./Products";
import GeneralNote from "./GeneralNote";
import ProductNote from "./ProductNote";
import Modifier from "./Modifier";
import ProductSearch from "./ProductSearch";
import jquery from "jquery";

@observer
export default class Menu extends Component {

    static getLayoutDimensions() {
        return {
            width: jquery('.layout').width(),
            height: jquery('.layout').height()
        };
    }

    onResize = () => {
        const layoutDimensions = Menu.getLayoutDimensions();
        this.props.page.floorWidth = layoutDimensions.width;
        this.props.page.floorHeight = layoutDimensions.height;
    };

    componentDidMount() {
        jquery(window).resize(this.onResize);

        const intervalId = setInterval(() => {
            const layoutDimensions = Menu.getLayoutDimensions();
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
        const {
            isLoading,
            isGeneralNote,
            modifierStore,
            modifierStore: {showModifier},
            productNoteStore,
            rootStore: {settingStore},
            productNoteStore: {showProductNote},
            productSearchStore: {showSearchScreen}
        } = this.props.page;
        if (isLoading) {
            return;
        }

        return (
            <div className="col-7 col-lg-8 layout pl-2">
                {showProductNote ? <ProductNote productNoteStore={productNoteStore} modifierStore={modifierStore} settingStore={settingStore}/> : null}
                {isGeneralNote ? <GeneralNote page={this.props.page}/> : null}
                {showSearchScreen ? <ProductSearch page={this.props.page}/> : null}
                {showModifier ? <Modifier modifierStore={modifierStore} settingStore={settingStore}/> : null}
                {!showModifier && !showProductNote && !isGeneralNote && !showSearchScreen ?
                    <React.Fragment>
                        <Categories page={this.props.page}/>
                        <SubCategories page={this.props.page}/>
                        <Products page={this.props.page}/>
                    </React.Fragment> : null
                }
            </div>
        );
    }
}