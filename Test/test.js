const chai = require('chai');
const chaiHttp = require('chai-http');
const testConfig = require('./config/testConfig');
const should = chai.should();

chai.use(chaiHttp);

describe('Martian-Robots Project', () => {

    describe('POST /', () => {
        it('It has to return the output correctly of the game execution', (done) => {
            const data = { data: "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL" };
            chai.request(testConfig.testURLPublic)
                .post('/RobotsGame')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('output').eql('1 1 E\n3 3 N LOST\n2 3 S');
                    done();
                });
        });

    });

    describe('POST /', () => {
        it('It has to return that the input is invalid', (done) => {
            const data = { data: "5\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL" };
            chai.request(testConfig.testURLPublic)
                .post('/RobotsGame')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('output').eql('Invalid data input. Check documentation for input instructions');
                    done();
                });
        });
    });

});
