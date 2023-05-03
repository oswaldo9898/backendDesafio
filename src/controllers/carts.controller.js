import Carts from "../dao/dbManager/carts.js";
import Products from "../dao/dbManager/products.js";
import CartsRepository from "../repository/carts.repository.js";
import { v4 as uuidv4 } from 'uuid';
import ProductsRepository from "../repository/products.repository.js";

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


const addProductCart =  async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cartsRepository.addProductCart(cid, pid);
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

  try {
    data.code = uuidv4();
    const resp = await cartsRepository.purchase(data);
    res.send({ message: "success", payload: resp });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
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
  purchase
};
