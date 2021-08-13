const assert = require('assert'),
    request = require('axios'),
    parser = require("fast-xml-parser");

const CBR_PRIMARY_URL = "http://www.cbr.ru/scripts/XML_daily.asp"

/**
 * @param {Date|undefined} date
 * @return {{date_req: string}}
 */
const prepareParams = ({date}) => {
    date = date || new Date();
    assert(date, 'Please supply a valid date!');
    return {date_req: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
}

/**
 *
 * @param xmlData
 * @return {Map<String, {value: Number, par: Number}>}
 */
const parse = (xmlData) => {
    const results = parser.parse(xmlData);

    if (results.ValCurs.Valute === undefined) {
        throw new Error(results.ValCurs);
    }
    const rates = new Map();
    results.ValCurs.Valute.forEach(rate => {
        rates.set(rate.CharCode, {
            value: parseFloat(rate.Value.replace(/,/g, '.')),
            par: parseInt(rate.Nominal)
        })
    });
    return rates;
}

module.exports = {
    /**
     * @param {Date} date
     * @return {Promise<Map>}
     */
    load: async (date = null) => {
        return request.get(CBR_PRIMARY_URL, {
            params: prepareParams({date}),
            transformResponse: parse
        }).then(res => {
            return res.data;
        })
    }
}