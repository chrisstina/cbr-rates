const chai = require('chai')
const cbr = require("../index");
chai.should()

describe('CBR rates module', () => {
    it('should retrieve rates', (done) => {
        const cbr = require('../index')
        cbr.load()
            .then(rates => {
                rates.size.should.be.greaterThan(0)
                rates.get('USD').should.not.be.empty
                done()
            })
            .catch(e => {
                done(e)
            })
    })

    it('should retrieve rates for a particular date', (done) => {
        const cbr = require('../index')
        cbr.load(new Date('2021-08-11'))
            .then(rates => {
                rates.size.should.be.greaterThan(0)
                rates.get('USD').should.not.be.empty
                done()
            })
            .catch(e => {
                done(e)
            })
    })
})