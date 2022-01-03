import LayoutObject from "./LayoutObject";
import JsonParser from "../utils/JsonParser";

export default class Floor {
    Id = null;

    FloorName = null;

    DisplayOrder = null;

    LineElements = null;

    PrinterName = null;

    LayoutObjects = [];

    IdOperationType = 0;

    createFromJson(json) {
        this.Id = JsonParser.int(json, 'Id');
        this.FloorName = JsonParser.string(json, 'FloorName');
        this.DisplayOrder = JsonParser.int(json, 'DisplayOrder');
        this.LineElements = JsonParser.string(json, 'LineElements');
        this.PrinterName = JsonParser.int(json, 'PrinterName');
        this.LayoutObjects = JsonParser.array(json, 'LayoutObjects').map(LayoutObject.createFromJson);
        this.IdOperationType = JsonParser.int(json, 'IdOperationType');
    }

    static createFromJson(json) {
        const floor = new Floor();
        floor.createFromJson(json);
        return floor;
    }
}