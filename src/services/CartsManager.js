import fs from "fs";
import ProductManager from '../services/ProductManager.js';
import { __dirname } from '../utils.js';
import { join } from 'path';

export default class CartsManager {

  constructor(ruta) {
    this.carts = [];
    this.path = ruta;
    this.getCarts();
    this.productManager = new ProductManager(join(__dirname,'archivo/productos.json'));
  }



  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
      }
    } catch (e) {
      console.log(e);
    }
  };



  addCart = async () => {
    try {
      let cart = {
        id: 0,
        products: [],
      };
      if (this.carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = this.carts[this.carts.length - 1].id + 1;
      }

      this.carts.push(cart);
      await fs.promises.writeFile(this.path,JSON.stringify(this.carts, null, "\t"));
      return this.carts;
    } catch (e) {
      console.log(e);
    }
  };



  getProductsCart = async(cid) => {
    try{
      const cartIndex = this.carts.findIndex( c => c.id === cid);
      if( cartIndex === -1 ){
        return {message: 'El carrito no existe'};
      }
      return this.carts[cartIndex].products;
    }catch(e){
      console.log(e);
    }
  };



  agregarProductoCart = async(cid, pid) => {
    const cartIndex = this.carts.findIndex( c => c.id === cid );
    if(cartIndex === -1 ){
      return {message: 'El carrito no existe'};
    }

    const getProductArr = await this.productManager.getProductById(pid);
    if(getProductArr.length === 0){
      return {message: 'El producto que desea agregar no existe'};
    }

    const productIndex = this.carts[cartIndex].products.findIndex( p => p.product === pid );
    if( productIndex === -1 ){
      const element = {
        product: pid,
        quantify: 1
      }
      this.carts[cartIndex].products.push(element);
    }else{
      this.carts[cartIndex].products[productIndex].quantify++;
    }
    await fs.promises.writeFile(this.path,JSON.stringify(this.carts, null, "\t"));
    return this.carts;
  };
}
