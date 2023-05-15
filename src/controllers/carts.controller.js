import Carts from "../dao/dbManager/carts.js";
import Products from "../dao/dbManager/products.js";
import CartsRepository from "../repository/carts.repository.js";
import { v4 as uuidv4 } from 'uuid';
import ProductsRepository from "../repository/products.repository.js";
import {createPDF} from './../utils/generatePDF/index.js';
import { sendEmail } from "../utils/sendEmail/index.js";
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
    res.send({ message: "Success", payload: cart });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const addProductCart =  (req, res) => {
  const { cid, pid } = req.params;
  const {cantidad } = req.body;
  try {
    if(pid == ''){
      throw CustomError.createError({
        name: 'UserError',
        cause: productCartErrorInfo({id}),
        message: 'Error al intentar agregar un producto al carrito',
        code: EErrors.INVALID_TYPES_ERROR
      });
    }
    const resp = cartsRepository.addProductCart(cid, pid, cantidad);
    res.send({ message: "Success", payload: resp });

  } catch (error) {
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
    res.send({ message: "Success", payload: resp });
  } catch (error) {
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
    res.send({ message: "Success", payload: resp });
  } catch (error) {
    console.log(error);
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
  try {
    const resp = await cartsRepository.updateQuantityProductCart(
      cid,
      pid,
      cantidad
    );
    res.send({ message: "Success", payload: resp });
  } catch (error) {
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
    res.send({ message: "Success", payload: resp });
  } catch (error) {
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
    for (const productCart of productsCart){
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

    const resTicket = await cartsRepository.getTicket(resp._id)

    createPDF(resTicket);
    sendEmail(resTicket);

    res.send({ message: "success", payload: resp });
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
}

const obtenerTicket = async(req, res) =>{
  const { id } = req.params;
  const resTicket = await cartsRepository.getTicket(id);
  res.send({ message: "success", payload: resTicket });
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
  obtenerTicket
};
