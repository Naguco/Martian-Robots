const chai = require('chai');
const chaiHttp = require('chai-http');
const GameSchema = require('../Database/models/schemas/gameSchema');
const testConfig = require('./config/testConfig');
const startDatabaseInstance = require('../Database/database');
const should = chai.should();

chai.use(chaiHttp);

startDatabaseInstance();

describe('Martian-Robots Project', () => {
    beforeEach((done) => {
        GameSchema.remove({}, (err) => { done(); }); // Cleaning database
    });

    describe('GET /RobotsGame/games', () => {
        it('It has to return the message that there are no games played', (done) => {
            chai.request(testConfig.testURLPrivate)
                .get('/RobotsGame/games')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('output').eql('No games played at the moment.');
                    done();
                });
        });
    });

    describe('POST /', () => {
        it('It has to return the output correctly of the game execution', (done) => {
            const data = { data: "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL" };
            chai.request(testConfig.testURLPrivate)
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
            chai.request(testConfig.testURLPrivate)
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
