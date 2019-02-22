'use strict';
//During the test the env variable is set to test

process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

let image = 'http://jevinik.com.ng/images/logo.png';
let token;
let user = {
    "password": "hhhhhhhhhhhhhhh",
    "username": "Zainab",
};

describe('Generating Image Thumbnail with authentication.', () => {

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

    describe('/POST Generating Image Thumbnail', () => {

        //tests

        it('image url must be a string', (done) => {
            image.should.be.a('string');

            done();
        });

        it('it should download the image and return a thumbnail', (done) => {

            chai.request(server)
                .post('/image-thumbnail/generate')
                .set(`Authorization`, `Bearer ${token}`)
                .send({image})
                .end((err, res) => {
                    console.log("err")
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('message');
                    res.body.should.have.property('filepath');
                    res.body.filepath.should.be.a('string');

                    done();
                });
        });
    });
});