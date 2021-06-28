const assert = require('assert'),
    config = require('config'),
    moment = require('moment'),
    request = require('axios'),
    parser =  require("fast-xml-parser");

const CBR_PRIMARY_URL = config.get('cbrPrimaryURL')

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
};

module.exports = {

    /**
     * @param {Date} date
     * @return {Promise<Map>}
     */
    load: (date = null) => {
        date = date || new Date();
        assert(moment(date).isValid(), 'Please supply a valid date!');
        return request.get(CBR_PRIMARY_URL, {
            params: {date_req: moment(date).format('DD/MM/YYYY')},
            transformResponse: parse
        }).then(res => {
            return res.data;
        });
    }
};