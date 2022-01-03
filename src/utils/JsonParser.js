function parseBool(value) {
    return value === 'true';
}

export default class JsonParser {
    static int(json, tag) {
        return this.parse(json, tag, parseInt);
    }

    static bool(json, tag) {
        return this.parse(json, tag, parseBool);
    }

    static float(json, tag) {
        return this.parse(json, tag, parseFloat);
    }

    static string(json, tag) {
        return this.parse(json, tag);
    }

    static array(json, tag) {
        const result = this.parse(json, tag, null);
        return result ? result : [];
    }

    static parse(json, tag, parser) {
        const element = json[tag];
        if (element && element.toString().trim().length === 0) {
            return null;
        }

        return parser ? parser(element) : element;
    }
}