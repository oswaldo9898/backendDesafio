import * as usersService from './../services/users.service.js';


const getUsers = async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const users = await usersService.getUsers(limit, page, query, sort);
        return res.send({ status: "success", payload: users });
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



const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        return res.send({ status: "success", payload: users });
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



const updateRole = async (req, res) => {
    const { role } = req.body;
    const id = req.params.uid;

    try {
        const result = await usersService.updateRole(id, role);
        if (result != null) {
            return res.send({ status: "success", payload: result });
        }
        return res.status(401).send({ status: "Error", message: "El usuario no ha terminado de cargar su documentación" });

    } catch (error) {
        req.logger.error(error);
        console.log(error)
        res
            .status(400)
            .send({
                status: "Error",
                message: "Ha ocurrido un inconveniente en el servidor",
            });
    }
};




const saveDocument = async (req, res) => {
    const id = req.params.uid;
    const { name } = req.body;
    const file = req.file;

    try {

        const result = await usersService.saveDocument(id, name, file);
        return res.send({ status: "success", payload: result });

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


const deleteUsers = async (req, res) => {

    try {
        const resp = await usersService.deleteUsers();
        return res.send({ status: "success", message: resp });

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



const deleteUser = async (req, res) => {
    const { uid } = req.params;

    try {
        if (uid) {
            const respon = await usersService.deleteUser(uid);
            return res.send({ message: "success", payload: respon });
        } else {
            return res.status(400).send({ status: "Error", message: "No ingreso un id" });
        }
    } catch (error) {
        console.log(error)
        req.logger.error(error);
        res
            .status(400)
            .send({
                status: "Error",
                message: "Ha ocurrido un inconveniente en el servidor",
            });
    }

};

export {
    getUsers,
    getAllUsers,
    updateRole,
    saveDocument,
    deleteUsers,
    deleteUser
};