import Products from "../dao/dbManager/products.js";
const productsManager = new Products();


const getProducts = async (req, res) => {
  const { limit, page, query, sort } = req.query;
  try {
    const products = await productsManager.getAll(limit, page, query, sort);
    return res.send({ status: "success", payload: products });
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const getProduct = async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await productsManager.getProductById(pid);
    product.length === 0
      ? res.send({
          status: "Error",
          message: "Not found: Producto no encontrado",
        })
      : res.send({ message: "Success", payload: product });
  } catch (e) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const saveProduct = async (req, res) => {
  const data = req.body;

  try {
    if (
      data.title === undefined ||
      data.description === undefined ||
      data.code === undefined ||
      data.price === undefined ||
      data.stock === undefined ||
      data.category === undefined
    ) {
      res
        .status(400)
        .send({
          status: "Error",
          message: "Debe ingresar todos los datos solicitados",
        });
    } else {
      const product = {
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: true,
        stock: data.stock,
        category: data.category,
        thumbnail: [],
      };

      const productArr = await productsManager.save(product);
      res.send({ message: "Success", payload: productArr });
    }
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const updateProduct = async (req, res) => {
  const pid = Number(req.params.pid);
  const data = req.body;

  try {
    if (
      data.title === undefined ||
      data.description === undefined ||
      data.code === undefined ||
      data.price === undefined ||
      data.stock === undefined ||
      data.category === undefined ||
      data.status === undefined
    ) {
      res
        .status(400)
        .send({
          status: "Error",
          message: "Debe ingresar todos los datos solicitados",
        });
    } else {
      const product = {
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: data.status,
        stock: data.stock,
        category: data.category,
        thumbnail: [],
      };
      const respon = await productsManager.update(pid, product);
      res.send(respon);
    }
  } catch (error) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const deleteProduct = async (req, res) => {
  const pid = req.params.pid;
  try {
    if (pid) {
      const respon = await productsManager.delete(pid);
      res.send(respon);
    } else {
      res.send({ status: "Error", message: "El producto es invalido" });
    }
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
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct
}
