import jquery from 'jquery';

function parseBool(value) {
    return value === 'true';
}

export default class XmlParser {
    static int(xml, tag) {
        return this.parse(xml, tag, parseInt);
    }

    static bool(xml, tag) {
        return this.parse(xml, tag, parseBool);
    }

    static string(xml, tag) {
        return this.parse(xml, tag);
    }

    static array(xml, tag) {
        const result = this.parse(xml, tag, null, 'children');

        return result ? result.toArray() : [];
    }

    static parse(xml, tag, parser, getValue = 'text') {
        const element = jquery(xml).find('>' + tag);

        if (element.length === 0 || element.attr('i:nil') === 'true') {
            return null;
        }

        return parser ? parser(element[getValue]()) : element[getValue]();
    }
}