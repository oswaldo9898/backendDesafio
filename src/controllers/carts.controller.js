import Carts from "../dao/dbManager/carts.js";
const cartsManager = new Carts();

const addCart = async (req, res) => {
  try {
    const cartsArr = await cartsManager.addCart();
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
    const cart = await cartsManager.getProductsCart(cid);
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
    const resp = await cartsManager.addProductCart(cid, pid);
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
    const resp = await cartsManager.deleteProductCart(cid, pid);
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
    const resp = await cartsManager.updateProductsCart(cid, products);
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
    const resp = await cartsManager.updateQuantityProductCart(
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
    const resp = await cartsManager.emptyCart(cid, pid);
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
    const resp = await cartsManager.probarPopulate(cid);
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

export {
  addCart,
  getProductsCart,
  addProductCart,
  deleteProductCart,
  updateProductsCart,
  updateQuantityProductCart,
  emptyCart,
  probarPopulate,
};
