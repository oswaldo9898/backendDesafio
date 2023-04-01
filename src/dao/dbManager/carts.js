import { cartModel } from "../models/carts.js";
import Products from './../../dao/dbManager/products.js';

const productsManager = new Products();

export default class Carts {

  constructor() { }

  getAll = async () => {
    const carts = await cartModel.find();
    return carts.map(cart => cart.toObject());
  };



  addCart = async () => {
    let cart = {
      products: [],
    };
    const result = await cartModel.create(cart);
    return result;
  };



  getProductsCart = async (cid) => {
    const cart = await cartModel.findById({ _id: cid }).populate({
      path: 'products.product',
      model: 'products'
    });

    if (!cart) {
      return { message: 'El carrito no existe' };
    }
    return cart.products;
  };



  agregarProductoCart = async (cid, pid) => {
    const cart = await cartModel.findById({ _id: cid });
    if (!cart) {
      return { message: 'El carrito no existe' };
    }

    const product = await productsManager.getProductById(pid);

    if (!product) {
      return { message: 'El producto que desea agregar no existe' };
    }

    const productsCart = cart.products;
    const productIndex = productsCart.findIndex(p => p.product == pid);

    if (productIndex === -1) {
      const result = await cartModel.findByIdAndUpdate({ _id: cid }, { $push: { products: { "product": pid, "quantify": 1 } } });
      return result;
    } else {
      const result = await cartModel.updateOne({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantify": 1 } });
      return result;
    }
  }



  eliminarProductoCart = async (cid, pid) => {
    const cart = await cartModel.findById({ _id: cid });
    if (!cart) {
      return { message: 'El carrito no existe' };
    }
    const productsCart = await cartModel.updateOne({ _id: cid }, { $pull: { products: { "product": pid } } });
    return productsCart
  }



  actualizarProductosCart = async (cid, productos) => {
    const cart = await cartModel.findById({ _id: cid });

    if (!cart) {
      return { message: 'El carrito no existe' };
    }

    const result = await cartModel.updateOne({ _id: cid}, { "products": productos });
    return result;
  }



  actualizarCantidadProductoCart = async (cid, pid, cantidad) => {
    const cart = await cartModel.findById({ _id: cid });

    if (!cart) {
      return { message: 'El carrito no existe' };
    }

    const productsCart = cart.products;
    const productIndex = productsCart.findIndex(p => p.product == pid);

    if (productIndex === -1) {
      return { message: 'El producto no existe' };;
    } else {
      const result = await cartModel.updateOne({ _id: cid, "products.product": pid }, { "products.$.quantify": cantidad });
      return result;
    }
  }



  vaciarCart = async (cid) => {
    const cart = await cartModel.findById({ _id: cid });
    if (!cart) {
      return { message: 'El carrito no existe' };
    }
    const result = await cartModel.updateOne({ _id: cid }, { "products": [] });
    return result;
  }



  probarPopulate = async (cid) => {
    const cart = await cartModel.findById({ _id: cid })
      .populate({
        path: 'products.product',
        model: 'products'
      });
    return cart;
  }
}