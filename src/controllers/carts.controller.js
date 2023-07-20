import { productCartErrorInfo } from "../services/errors/info.js";
import * as cartsService from './../services/carts.service.js';



const addCart = async (req, res) => {
  try {
    const cartsArr = await cartsService.addCart;
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
    const cart = await cartsService.getProductsCart(cid);
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
    const resp = await cartsService.addProductCart(cid, pid, cantidad);
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
    const resp = await cartsService.deleteProductCart(cid, pid);
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
    const resp = await cartsService.updateProductsCart(cid, products);
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
  try {
    const resp = await cartsService.updateQuantityProductCart(cid,pid,cantidad);
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
    const resp = await cartsService.emptyCart(cid, pid);
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


const purchase = async(req, res) => {
  const { cid } = req.params;
  let data  = req.body;

  try {
    const resp = await cartsService.purchase(cid, data);
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

  try {
    const resTicket = await cartsService.getTicket(id);
    res.send({ message: "success", payload: resTicket });

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


const cantProductos = async(req, res) => {
  
  try {
    let cid = req.session.user.cart;
    const totalProducts = await cartsService.cantProductos(cid);    
    res.send({ message: "success", payload: totalProducts });
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
