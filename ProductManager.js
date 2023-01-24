// import fs from 'fs';
const fs = require('fs');


class ProductManager {

    constructor(){
        this.products = [];
        this.path = './archivo/productos.json'
    }


    addProduct = async (product) => {
        
        if(product.title === undefined || product.description === undefined || product.price === undefined || product.thumbnail === undefined || product.code === undefined || product.stock === undefined){
            console.log('ERROR: Debe ingresar todos los campos');
            return;
        }

        const productIndex = this.products.findIndex(e=>e.code === product.code);

        if(productIndex != -1){
            console.log('ERRO: el código que desea ingresar ya existe');
            return;
        }

        if(this.products.length === 0){
            product.id = 1;
        }else {
            product.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'));
    }

    getProducts = async () => {

        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
                
            }
            return this.products;

        }catch(e) {
            console.log(e);
        }
    };

    getProductById = (id) => {
        const productIndex = this.products.findIndex(e=>e.id === id);

        if (productIndex === -1){
            console.log('Not found: Producto no encontrado');
            return;
        }else{
            console.log(this.products[productIndex]);
        }
    }

    updateProduct = async (id, product) => {
        const productIndex = this.products.findIndex(e=>e.id === id);

        if (productIndex === -1){
            console.log('Not found: Producto a editar no encontrado');
            return;
        }else{
            //this.products[productIndex] = product;

            const update = this.products.map( (element) => {

                if(element.id === id){
                    element.title = product.title,
                    element.description = product.description,
                    element.price = product.price,
                    element.thumbnail = product.thumbnail,
                    element.code = product.code,
                    element.stock = product.stock
                }
                return element;

            });

            this.products = update;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'));
    }

    deleteProduct = async(id) => {
        const productIndex = this.products.findIndex(e=>e.id === id);

        if (productIndex === -1){
            console.log('Not found: Producto ha eliminar no encontrado');
            return;
        }else{
            this.products.splice(productIndex,1);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'));
    }

}



const manejadorProductos = new ProductManager();

const test = async() => {
    console.log( await manejadorProductos.getProducts());


    //REGISTRAR NUEVOS PRODUCTOS
    const product = {
        title:'producto prueba',
        description:'Este es un producto prueba',
        price:200,
        thumbnail:'sin imagen',
        code:'abc123',
        stock:25
    }
    await manejadorProductos.addProduct(product);
    const product2 = {
        title:'producto prueba',
        description:'Este es un producto prueba',
        price:200,
        thumbnail:'sin imagen',
        code:'abc1234',
        stock:25
    }
    await manejadorProductos.addProduct(product2);

    // //OBTENER PRODUCTOS REGISTRADOS
    console.log(await manejadorProductos.getProducts());

    //BUSCAR POR ID UN PRODUCTO EN ESPECIFICO
    manejadorProductos.getProductById(1);

    //EDITAR UN PRODUCTO EXISTENTE
    const editProduct2 = {
        title:'producto editado',
        description:'Este es un producto editado',
        price:100,
        thumbnail:'con imagen',
        code:'abc1234',
        stock:12
    }
    await manejadorProductos.updateProduct(2,editProduct2);
    console.log(await manejadorProductos.getProducts());

    //ELIMINAR UN PRODUCTO EN ESPECIFICO
    await manejadorProductos.deleteProduct(1);
    console.log(await manejadorProductos.getProducts());

}

test();



// 
//console.log(manejadorProductos.getProducts());
// manejadorProductos.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen", "abc1234",44);
// manejadorProductos.getProductById(2);

