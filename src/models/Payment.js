import JsonParser from "../utils/JsonParser";

export default class Payment{
    Id = 0;
    PaymentType = 0;
    IdPaymentType = 0;
    Amount = 0;

    createFromJson(json) {
        this.Id = JsonParser.int(json, 'Id');
        // this.PaymentType = PaymentType.createFromJson(JsonParser.array(json, 'PaymentType'));
        this.PaymentType = JsonParser.int(json, 'PaymentType');
        this.IdPaymentType = JsonParser.int(json, 'IdPaymentType');
        this.Amount = JsonParser.int(json, 'Amount');
    }

    static createFromJson(json) {
        const payment = new Payment();
        payment.createFromJson(json);
        return payment;
    }
}