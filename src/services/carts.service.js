import Carts from "../dao/dbManager/carts.js";
import Products from "../dao/dbManager/products.js";
import CartsRepository from "../repository/carts.repository.js";
import { v4 as uuidv4 } from 'uuid';
import ProductsRepository from "../repository/products.repository.js";
import { createPDF } from './../utils/generatePDF/index.js';
import { sendEmailTicket } from "../utils/sendEmail/index.js";

const cartsManager = new Carts();
const productssManager = new Products();
const cartsRepository = new CartsRepository(cartsManager);
const productsRepository = new ProductsRepository(productssManager);

const addCart = async () => {
  const cartsArr = await cartsRepository.addCart();
  return cartsArr;
};


const getProductsCart = async (cid) => {
  const cart = await cartsRepository.getProductsCart(cid);
  return cart;
};


const addProductCart = async (cid, pid, cantidad) => {
  const resp = await cartsRepository.addProductCart(cid, pid, cantidad);
  return resp;
};


const deleteProductCart = async (cid, pid) => {
  const resp = await cartsRepository.deleteProductCart(cid, pid);
  return resp;

};


const updateProductsCart = async (cid, products) => {
  const resp = await cartsRepository.updateProductsCart(cid, products);
  return resp;

};


const updateQuantityProductCart = async (cid, pid, cantidad) => {
  const resp = await cartsRepository.updateQuantityProductCart(
    cid,
    pid,
    cantidad
  );
  return resp;
};


const emptyCart = async (cid, pid) => {
  const resp = await cartsRepository.emptyCart(cid, pid);
  return resp;

};



const purchase = async (cid, data) => {

  let totalAPagar = 0;
  const productsBuy = []

  const productsCart = await cartsRepository.getProductsCart(cid);

  for (const productCart of productsCart) { // Recorreo cada producto en el carrito
    const product = await productsRepository.getProduct(productCart.product._id);//Obtengo el producto de la base de datos

    if (product.stock >= productCart.quantify) {
      let productValido = {
        product: product._id,
        quantify: productCart.quantify
      }
      productsBuy.push(productValido);

      const newStock = product.stock - productCart.quantify;//Calculo el nuevo stock para cada producto
      product.stock = newStock;
      await productsRepository.updateProduct(product._id, product);//Actualizo el producto con el nuevo stock
      await cartsRepository.deleteProductCart(cid, product._id);//Elimino el producto del carrito
      const subTotal = (productCart.quantify * product.price);
      totalAPagar += subTotal;
    }
  }

  data.code = uuidv4();
  data.amount = totalAPagar;
  data.products = productsBuy;
  const resp = await cartsRepository.purchase(data);//Creo el ticket en la base de datos

  const resTicket = await cartsRepository.getTicket(resp._id)//Obtiene el ticket recien creado

  createPDF(resTicket);
  sendEmailTicket(resTicket);

  return resp;
}




const getTicket = async (id) => {
  const resTicket = await cartsRepository.getTicket(id);
  return resTicket;
}




const cantProductos = async (cid) => {
  let totalProducts = 0;

  const cart = await cartsRepository.getProductsCart(cid);

  cart.map(product => {
    totalProducts += product.quantify;
  });

  return totalProducts;

}



export {
  addCart,
  getProductsCart,
  addProductCart,
  deleteProductCart,
  updateProductsCart,
  updateQuantityProductCart,
  emptyCart,
  purchase,
  getTicket,
  cantProductos
};
