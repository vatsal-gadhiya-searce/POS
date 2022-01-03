import JsonParser from "../utils/JsonParser";

export default class ProductModifierItem {

    IsDefaultSelection = false;
    Description = '';
    Price = 0;

    createFromJson(json) {
        this.IsDefaultSelection = JsonParser.bool(json, 'IsDefaultSelection');
        this.Description = JsonParser.string(json, 'Description');
        this.Price = JsonParser.string(json, 'Price');
    }

    addProductModifier(modifier){
        this.IsDefaultSelection = modifier.IsDefaultSelection ? modifier.IsDefaultSelection : false;
        this.Description = modifier.Description ? modifier.Description : '';
        this.Price = modifier.Price ? modifier.Price : 0;
    }

    static createFromJson(json) {
        const productModifierItem = new ProductModifierItem();
        productModifierItem.createFromJson(json);
        return productModifierItem;
    }

    static addProductModifier(modifier) {
        const newProductModifierItem = new ProductModifierItem();
        newProductModifierItem.addProductModifier(modifier);
        return newProductModifierItem;
    }
}