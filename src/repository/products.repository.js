export default class ProductsRepository {
    constructor(dao){
        this.dao = dao;
    }

    getProducts = async(limit, page, query, sort) => {
        const products = await this.dao.getAll(limit, page, query, sort);
        return products;
    }

    getProduct = async(pid) => {
        const product = await this.dao.getProductById(pid);
        return product;
    }

    saveProduct = async(product) => {
        const productArr = await this.dao.save(product);
        return productArr;
    }

    updateProduct = async(pid, product) => {
        const respon = await this.dao.update(pid, product);
        return respon;
    }

    deleteProduct = async(pid) => {
        const respon = await this.dao.delete(pid);
        return respon;
    }

}