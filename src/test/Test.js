process.env.NODE_ENV = 'test';

import chai from "chai";
import chaihttp from "chai-http";;



chai.use(chaihttp);
const should = chai.should()
describe('/Login and Register test chai', () => {
    it('Get Home page', (done) => {
        chai.request('http://localhost:4444/')
            .get('/home')
            .end((err, res) => {
                res.should.have.status(200);
            })
    });

    it('Đăng kí thành công', (done) => {
        let user = {
            username: 'hungledanh26092001',
            password: 'hungledanh2609',
            name: 'ledanhhungww',
            email: 'hungmetxi@gmail.com'

        }

        chai.request('http://localhost:4444/')
            .post('auth/dangki')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('username');
                done();
            })

    });
    it('đăng kí thất bại', (done) => {
        let user = {
            username: 'hungledanh26092001',
            password: 'hungledanh2609',
            name: 'ledanhhungww',
            email: 'hungmetxi@gmail.com'

        }
        chai.request('http://localhost:4444/')
            .post('auth/dangki')
            .send(user)
            .end((err, res) => {
                res.should.have.status(406);

            })
    });
    it('đăng nhập thành công', (done) => {
        let user = {
            username: 'hunghung1',
            password: 'hunghung1',
            email: 'hungldph11449@fpt.edu.vn'
        }
        chai.request('http://localhost:4444/')
            .post('auth/dangnhap')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            })

    });
    // get user test 
    it('test get user', (done) => {
        chai.request('http://localhost:4444/')
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

            })

    });

});