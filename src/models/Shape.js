import JsonParser from "../utils/JsonParser";

export default class Shape {
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

    TableShortDescription = null;

    TemporaryName = null;

    Width = null;

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
        this.TableShortDescription = JsonParser.string(json, 'TableName');
        this.TemporaryName = JsonParser.int(json, 'TemporaryName');
        this.Width = JsonParser.int(json, 'Width');
        this.Seat = JsonParser.int(json, 'Seat');
    }

    static createFromJson(json) {
        const shape = new Shape();
        shape.createFromJson(json);
        return shape;
    }
}