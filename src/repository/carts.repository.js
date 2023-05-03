export default class CartsRepository {
    constructor(dao){
        this.dao = dao;
    }

    addCart = async() => {
        const cartsArr = await this.dao.addCart();
        return cartsArr;
    }

    getProductsCart = async(cid) => {
        const cart = await this.dao.getProductsCart(cid);
        return cart;
    }

    addProductCart = async(cid, pid) => {
        const resp = await this.dao.addProductCart(cid, pid);
        return resp;
    }

    deleteProductCart = async(cid, pid) => {
        const resp = await this.dao.deleteProductCart(cid, pid);
        return resp;
    }

    updateProductsCart = async(cid, products) => {
        const resp = await this.dao.updateProductsCart(cid, products);
        return resp;
    }

    updateQuantityProductCart = async() => {
        const resp = await this.dao.updateQuantityProductCart();
        return resp;
    }

    emptyCart = async(cid, pid) => {
        const resp = await this.dao.emptyCart(cid, pid);
        return resp;
    }

    probarPopulate = async(cid) => {
        const resp = await this.dao.probarPopulate(cid);
        return resp;
    }

}