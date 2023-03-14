import { cartModel } from "../models/carts.js";
import Products from './../../dao/dbManager/products.js';

const productsManager = new Products();

export default class Carts {

    constructor(){}

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



    getProductsCart = async(cid) => {
        try{
            const cart = await cartModel.findById({_id: cid});

            if(!cart){
                return {message: 'El carrito no existe'};
            }
            return cart.products;
        }catch(e){
            return {message: 'El carrito no existe'};
        // console.log(e);
        }
    };



    agregarProductoCart = async(cid, pid) => {
        try {
            const cart = await cartModel.findById({_id: cid});

            if(!cart ){
            return {message: 'El carrito no existe'};
            }
    
            const product = await productsManager.getProductById(pid);
    
            if(!product){
            return {message: 'El producto que desea agregar no existe'};
            }
    
            const productsCart = cart.products;
            const productIndex = productsCart.findIndex( p => p.product === pid );
    
            if(productIndex === -1){            
                const result = await cartModel.findByIdAndUpdate({_id: cid}, {$push: {products: {"product": pid, "quantify":1}} });
                return result;
            }else{
                const result = await cartModel.updateOne({_id: cid, "products.product": pid} , {$inc: {"products.$.quantify": 1} });
                return result;
            }
        } catch (error) {
            return [{message:'Ocurrio un error'}]
        }
    }
}