import Carts from "../dao/dbManager/carts.js";
import Products from "../dao/dbManager/products.js";
import CartsRepository from "../repository/carts.repository.js";
import { v4 as uuidv4 } from 'uuid';
import ProductsRepository from "../repository/products.repository.js";
import {createPDF} from './../utils/generatePDF/index.js';
import { sendEmailTicket } from "../utils/sendEmail/index.js";
import { productCartErrorInfo } from "../services/errors/info.js";

const cartsManager = new Carts();
const productssManager = new Products();
const cartsRepository = new CartsRepository(cartsManager);
const productsRepository = new ProductsRepository(productssManager);

const addCart = async (req, res) => {
  try {
    const cartsArr = await cartsRepository.addCart();
    res.send({ message: "Success", payload: cartsArr });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const getProductsCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsRepository.getProductsCart(cid);
    res.send({ status: "success", payload: cart });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const addProductCart =  async(req, res) => {
  const { cid, pid } = req.params;
  const { cantidad } = req.body;
  try {
    if(pid == ''){
      throw CustomError.createError({
        name: 'UserError',
        cause: productCartErrorInfo({id}),
        message: 'Error al intentar agregar un producto al carrito',
        code: EErrors.INVALID_TYPES_ERROR
      });
    }
    const resp = await cartsRepository.addProductCart(cid, pid, cantidad);
    res.send({ status: "success", message: "Se agrego el producto correctamente" });

  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const deleteProductCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cartsRepository.deleteProductCart(cid, pid);
    res.send({ status: "success", payload: resp });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const updateProductsCart = async (req, res) => {
  const { cid } = req.params;
  const products = req.body;
  try {
    const resp = await cartsRepository.updateProductsCart(cid, products);
    res.send({ status: "success", payload: resp });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const updateQuantityProductCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { cantidad } = req.body;
  console.log(cid);
  console.log(pid);
  console.log(cantidad);
  try {
    const resp = await cartsRepository.updateQuantityProductCart(
      cid,
      pid,
      cantidad
    );
    res.send({ status: "success", payload: resp });
  } catch (error) {
    req.logger.error(error);
    console.log(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const emptyCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cartsRepository.emptyCart(cid, pid);
    res.send({ status: "success", payload: resp });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const probarPopulate = async (req, res) => {
  const { cid } = req.params;
  try {
    const resp = await cartsRepository.probarPopulate(cid);
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const purchase = async(req, res) => {
  const { cid } = req.params;
  let data  = req.body;
  let totalAPagar = 0;
  const productsBuy = []

  try {
    const productsCart = await cartsRepository.getProductsCart(cid);

    for (const productCart of productsCart){ // Recorreo cada producto en el carrito
      const product = await productsRepository.getProduct(productCart.product._id);//Obtengo el producto de la base de datos

      if(product.stock >= productCart.quantify){
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

    res.send({ status: "success", payload: resp });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
}

const getTicket = async(req, res) =>{
  const { id } = req.params;
  const resTicket = await cartsRepository.getTicket(id);
  res.send({ message: "success", payload: resTicket });
}

const cantProductos = async(req, res) => {
  let totalProducts = 0;
  try {
    let cid = req.session.user.cart;
    const cart = await cartsRepository.getProductsCart(cid);

    cart.map(product => {
      totalProducts += product.quantify;
    });
    
    res.send({ message: "success", payload: totalProducts });
  } catch (error) {
    console.log(error)
  }
} 

export {
  addCart,
  getProductsCart,
  addProductCart,
  deleteProductCart,
  updateProductsCart,
  updateQuantityProductCart,
  emptyCart,
  probarPopulate,
  purchase,
  getTicket,
  cantProductos
};
