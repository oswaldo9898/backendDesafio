class ProductManager {

    constructor(){
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if(title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined){
            console.log('ERROR: Debe ingresar todos los campos');
            return;
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const productIndex = this.products.findIndex(e=>e.code === code);

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
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        const productIndex = this.products.findIndex(e=>e.id === id);

        if (productIndex === -1){
            console.log('Not found');
            return;
        }else{
            console.log(this.products[productIndex]);
        }
    }

}

const manejadorProductos = new ProductManager();
console.log(manejadorProductos.getProducts());
manejadorProductos.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen", "abc123",25);
console.log(manejadorProductos.getProducts());
manejadorProductos.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen", "abc1234",44);
manejadorProductos.getProductById(2);

