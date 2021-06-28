const chai = require('chai')
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
})