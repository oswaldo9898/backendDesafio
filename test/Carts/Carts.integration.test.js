import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing del carrito de compras', () => {
    let cookie, cid;

    it('POST de /api/sessions debe logearse correctamente y retornar una cookie', async() => {

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


    it('POST de /api/carts crear un carrito correctamente', async() => {

        const {statusCode, _body} = await requester.post('/api/carts')
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        cid = _body.payload._id;

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body.payload).to.have.property('_id');
    });


    it('POST de /api/carts/:cid/products/:pid agregar un producto al carrito correctamente', async() => {

        const cantidadtMock = {
            cantidad: 1
        }
        let pid = '640e62f456850c0b0c195ce7'

        const {statusCode, _body} = await requester.post(`/api/carts/${cid}/products/${pid}`)
        .send(cantidadtMock)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('message');
        expect(_body.status).to.be.eql('success');
    });


    it('GET de /api/carts/:cid obtener todos los productos del carrito correctamente', async() => {


        const {statusCode, _body} = await requester.get(`/api/carts/${cid}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);


        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
        expect(Array.isArray(_body.payload)).to.be.eql(true);
    });


    it('DELETE de /api/carts/:cid/products/:pid eliminar un producto del carrito correctamente', async() => {
        let pid = '640e62f456850c0b0c195ce7'

        const {statusCode, _body} = await requester.delete(`/api/carts/${cid}/products/${pid}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        // console.log(_body);
        // console.log(statusCode);


        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
        expect(_body.payload.modifiedCount).to.be.eql(1);
    });


    it('PUT de /api/carts/:cid editar los producto del carrito correctamente', async() => {
        let newProducts = [
            {
                "product":"640e62f456850c0b0c195ce7",
                "quantify":1
            },
            {
                "product":"640fb3ef463f6a69f6e7c3b9",
                "quantify":1
            }
        ]

        const {statusCode, _body} = await requester.put(`/api/carts/${cid}`)
        .send(newProducts)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
        expect(_body.payload.modifiedCount).to.be.eql(1);
    });


    it('PUT de /api/carts/:cid/products/:pid editar cantidad de un producto del carrito correctamente', async() => {
        let pid = '640e62f456850c0b0c195ce7'
        const cantidadtMock = {
            cantidad: 50
        }

        const {statusCode, _body} = await requester.put(`/api/carts/${cid}/products/${pid}`)
        .send(cantidadtMock)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);


        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
        expect(_body.payload.modifiedCount).to.be.eql(1);
    });


    it('POST de /api/carts/:cid/purchase relaizar la compra de los productos del carrito correctamente', async() => {

        const {statusCode, _body} = await requester.post(`/api/carts/${cid}/purchase`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);


        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
    });


    it('DELETE de /api/carts/:cid vaciar el carrito correctamente', async() => {

        const {statusCode, _body} = await requester.delete(`/api/carts/${cid}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
        expect(_body.payload.modifiedCount).to.be.eql(1);
    });




})
