import JsonParser from "../utils/JsonParser";
import ProductModifierItem from "./ProductModifierItem";

export default class ProductModifier {

    DisplayOrder = 0;
    IdProductModifier = 0;
    Title = null;
    ProductModifierType = 0;
    IsMandatory = false;
    SelectionMin = 0;
    SelectionMax = 0;
    ProductModifierItems = [];

    createFromJson(json) {
        this.IdProductModifier = JsonParser.int(json, 'IdProductModifier');
        this.DisplayOrder = JsonParser.int(json, 'DisplayOrder');
        this.IsMandatory = JsonParser.bool(json, 'IsMandatory');
        this.Title = JsonParser.string(json, 'Title');
        this.SelectionMin = JsonParser.int(json, 'SelectionMin');
        this.SelectionMax = JsonParser.int(json, 'SelectionMax');
        this.ProductModifierType = JsonParser.int(json, 'ProductModifierType');
        this.ProductModifierItems = JsonParser.array(json, 'ProductModifierItems').map(ProductModifierItem.createFromJson);
    }

    addModifier(modifier) {
        this.IdProductModifier = modifier.IdProductModifier ? modifier.IdProductModifier : 0;
        this.DisplayOrder = modifier.DisplayOrder ? modifier.DisplayOrder : 0;
        this.IsMandatory =  modifier.IsMandatory;
        this.Title = modifier.Title ? modifier.Title : '';
        this.SelectionMin = modifier.SelectionMin ? modifier.SelectionMin : 1;
        this.SelectionMax = modifier.SelectionMax ? modifier.SelectionMax : 4;
        this.ProductModifierType = modifier.ProductModifierType ? modifier.ProductModifierType : 0;
        this.ProductModifierItems =modifier.ProductModifierItems ? modifier.ProductModifierItems.map((modifierItem)=>ProductModifierItem.addProductModifier(modifierItem)): [] ;
    }

    static createFromJson(json) {
        const productModifier = new ProductModifier();
        productModifier.createFromJson(json);
        return productModifier;
    }

    static addModifier(modifier) {
        const newProductModifier = new ProductModifier();
        newProductModifier.addModifier(modifier);
        return newProductModifier;
    }
}