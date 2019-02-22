'use strict';
//During the test the env variable is set to test

process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//user supplies a json object
let json_object = {"firstName": "Zainab", "contactDetails": {"phoneNumbers": []}}


//user supplies a json parse object. json parse object can also be a single object
let json_parse_object = [
    { "op": "replace", "path": "/firstName", "value": "Olaitan" },
    { "op": "add", "path": "/lastName", "value": "Adegoke" },
    { "op": "add", "path": "/contactDetails/phoneNumbers/0", "value": { "number": "555-123" }  }
]

let reqData = {json_object, json_parse_object}

let token;
let user = {
    "password": "hhhhhhhhhhhhhhh",
    "username": "Zainab",

};

describe('JSON object patching with authentication', () => {

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

                    token = res.body.token;

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

    describe('/POST JSON object patching', () => {

        //tests
        it('request data should have a json object and json patching object', (done) => {
            reqData.should.have.property('json_object');
            reqData.should.have.property('json_parse_object');

            done();
        });

        it('json parse object should be an object', (done) => {
            reqData.json_parse_object.should.not.be.a('symbol');
            reqData.json_parse_object.should.not.be.a('string');
            reqData.json_parse_object.should.not.be.a('number');
            reqData.json_parse_object.should.not.be.a('null');
            reqData.json_parse_object.should.not.be.a('undefined');

            done();
        });

        it('json object should be an object', (done) => {
            reqData.json_object.should.be.a('object');

            done();
        });

        it('it should modify user json object and return a new object', (done) => {

            chai.request(server)
                .post('/json-patching/parse')
                .set(`Authorization`, `Bearer ${token}`)
                .send(reqData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');

                    done();
                });
        });
    });
});