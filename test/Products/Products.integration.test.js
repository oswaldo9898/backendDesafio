import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de productos', () => {
    let cookie, pid;

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


    it('GET de /api/products obtener productos correctamente', async() => {

        const {statusCode, _body} = await requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('status');
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
        expect(Array.isArray(_body.payload.docs)).to.be.eql(true);

    });


    it('POST de /api/products agregar un nuevo producto correctamente', async() => {

        const productMock = {
            title: 'Productos Test',
            category: 'Test',
            description: 'Prueba de testing de productos',
            price: 1,
            stock: 12,
            imgProducto: null,
            code: Date.now(),
            owner: 'adminCoder@coder.com'
        }

        const {statusCode, _body} = await requester.post('/api/products')
        .set('Cookie', [`${cookie.name}=${cookie.value}`])
        .send(productMock);

        pid = _body.payload._id;

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body.payload).to.have.property('_id');
    });


    it('GET de /api/products/:pid obtener un producto a partir de su ID correctamente', async() => {
        
        const {statusCode, _body} = await requester.get(`/api/products/${pid}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
        expect(_body).to.have.property('payload');
        expect(_body.status).to.be.eql('success');
    });


    it('GET de /api/products/:pid corroborar que si se envia un ID incorrectamente debe retornar un error', async() => {
        
        const {statusCode, _body} = await requester.get(`/api/products/231321516546`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(404);
        expect(_body.status).to.be.eql('Error');
    });


    it('PUT de /api/products/:pid editar un producto correctamente', async() => {

        const productUpdateMock = {
            title: 'Producto Test editado',
            category: 'Test',
            description: 'Prueba de testing de productos',
            price: 1,
            stock: 10,
            imgProducto: null,
            code: Date.now()
        }

        const {statusCode, _body} = await requester.put(`/api/products/${pid}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`])
        .send(productUpdateMock);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
    });


    it('DELETE de /api/products/:pid/:userSession corroborar que si se envia un usuario distinto no se permitira eliminar el producto correctamente', async() => {
        let userSession = 'usuario@coder.com';
        const {statusCode, _body} = await requester.delete(`/api/products/${pid}/${userSession}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(401);
        expect(_body).to.be.ok;
        expect(_body.status).to.be.eql('Error');
    });
    

    it('DELETE de /api/products/:pid/:userSession eliminar un producto a partir del ID correctamente', async() => {
        let userSession = 'adminCoder@coder.com';
        const {statusCode, _body} = await requester.delete(`/api/products/${pid}/${userSession}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(statusCode).to.be.eql(200);
        expect(_body).to.be.ok;
    });
})
