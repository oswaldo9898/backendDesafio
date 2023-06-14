import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de sessions', () => {
    let cookie, token;

    // it('POST de /api/sessions/register registrar nuevo usuario en la base de datos', async() => {

    //     const userRegisterMock = {
    //         first_name: 'usuario', 
    //         last_name: 'Test', 
    //         email: 'test@test.com', 
    //         age: 18,
    //         role: 'user',
    //         password: '12345'
    //     }

    //     const {statusCode, _body}  = await requester.post('/api/sessions/register')
    //     .send(userRegisterMock);

    //     expect(statusCode).to.be.eql(200);
    //     expect(_body).to.have.property('status');
    //     expect(_body.status).to.be.eql('success');
    // });

    
    it('POST de /api/sessions/login debe logearse correctamente y retornar una cookie', async() => {

        const userMock = {
            email: 'adminCoder@coder.com',
            password: 'Cod3r123'
        }

        const loginResult  = await requester.post('/api/sessions/login').send(userMock);
        const cookieResult = loginResult.header['set-cookie'][0];
        
        expect(cookieResult).to.be.ok;

        const cookieResultSplited = cookieResult.split('=');

        cookie = {
            name: cookieResultSplited[0],
            value: cookieResultSplited[1]
        };
        
        expect(cookie.name).to.be.ok.and.eql('coderCookieToken');
        expect(cookie.value).to.be.ok;
    });


    it('GET de /api/sessions/current enviar una cookie en el servicio current y entregue la informacion del usuario', async() => {

        const {statusCode, _body}  = await requester.get('/api/sessions/current')
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body.status).to.be.eql('success');
        expect(_body.payload.email).to.be.eql('adminCoder@coder.com');
    });


    it('POST de /api/sessions/recuperar-cuenta envia un email al usuario para que pueda recuperar la cuenta', async() => {

        const userMock = {
            email: 'test@test.com'
        }

        const {statusCode, _body}  = await requester.post('/api/sessions/recuperar-cuenta')
        .send(userMock);

        token = _body.token;

        console.log(token)

        expect(statusCode).to.be.eql(200);
        expect(_body.status).to.be.eql('success');
        expect(_body).to.have.property('token');
    });


    it('POST de /api/sessions/recuperar-cuenta envia un email no registrado para que retorne un error', async() => {

        const userMock = {
            email: 'testwe@test.com'
        }

        const {statusCode, _body}  = await requester.post('/api/sessions/recuperar-cuenta')
        .send(userMock);

        expect(statusCode).to.be.eql(404);
        expect(_body.status).to.be.eql('Error');
    });


    it('POST de /api/sessions/cambiar-password/:token envia un token y una nueva contraseña para que se pueda cambair la contraseña', async() => {

        const newPassword = {
            passwordNew: 'Aeioasdfsdfsdfsdfsvxcvu12%'
        }

        const {statusCode, _body}  = await requester.post(`/api/sessions/cambiar-password/${token}`)
        .send(newPassword);
        

        console.log(statusCode);
        console.log(_body);

        expect(statusCode).to.be.eql(200);
    });



})
