import JsonParser from "../utils/JsonParser";

export default class LayoutObject {
    Id = null;

    BlockTime = null;

    Height = null;

    IdBillPrinter = null;

    IdFloor = null;

    Lock = null;

    PositionLeft = null;

    PositionTop = null;

    Reserved = null;

    Shape = null;

    TableName = null;

    TemporaryName = null;

    Width = null;

    Capacity = null;

    IdOperationType = 0;

    createFromJson(json) {
        this.Id = JsonParser.int(json, 'Id');
        this.BlockTime = JsonParser.bool(json, 'BlockTime');
        this.Height = JsonParser.int(json, 'Height');
        this.IdBillPrinter = JsonParser.int(json, 'IdBillPrinter');
        this.IdFloor = JsonParser.int(json, 'IdFloor');
        this.Lock = JsonParser.bool(json, 'Lock');
        this.PositionLeft = JsonParser.int(json, 'PositionLeft');
        this.PositionTop = JsonParser.int(json, 'PositionTop');
        this.Reserved = JsonParser.bool(json, 'Reserved');
        this.Shape = JsonParser.int(json, 'Shape');
        this.TableName = JsonParser.string(json, 'TableName');
        this.TemporaryName = JsonParser.string(json, 'TemporaryName');
        this.Width = JsonParser.int(json, 'Width');
        this.Capacity = JsonParser.int(json, 'Capacity');
        this.IdOperationType = JsonParser.int(json, 'IdOperationType');
    }

    static createFromJson(json) {
        const table = new LayoutObject();
        table.createFromJson(json);
        return table;
    }
}