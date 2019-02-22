//During the test the env variable is set to test

process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
let user = {
    "password": "hhhhhhhhhhhhhhh",
    "username": "Zainab",

};

describe('authentication', () => {

    describe('/POST login', () => {

        //tests
        it('it should have a username and password', (done) => {
            user.should.have.property('username');
            user.should.have.property('password');

            done();
        });


        it('it should authenticate one user and return a token', (done) => {

            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.have.property('message');
                    res.body.should.have.property('token');
                    res.body.token.should.be.a('string');

                    done();
                });
        });
    });
});