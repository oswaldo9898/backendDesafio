import userModel from '../dao/models/users.model.js';
import { createHash, decodeToken, generateToken } from '../utils.js';
import Users from "../dao/dbManager/users.js"
import UsersRepository from '../repository/users.repository.js';
import CurrentDto from '../dao/DTOs/current.dto.js';
import { sendEmailResetPassword } from '../utils/sendEmail/index.js';

const usersManager = new Users();
const usersRepository = new UsersRepository(usersManager);


const getUsers = async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const users = await usersRepository.getUsers(limit, page, query, sort);
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
        const user = await usersRepository.getUser(id);

        const documents = user.documents;
        
        if(documents.length === 3 ){
            const result = await usersRepository.updateRole(id, role);
            return res.send({ status: "success", payload: result });
        }
        return res.status(401).send({ status: "Error", message:"El usuario no ha terminado de cargar su documentación" });

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


const updateLast_connection = async (req, res) => {
    const last_connection = new Date();
    const id = req.params.uid;
    // try {
    //     const result = await usersRepository.updateRole(id, last_connection);
    //     return res.send({ status: "success", payload: result });
    // } catch (error) {
    //     req.logger.error(error);
    //     res
    //         .status(400)
    //         .send({
    //             status: "Error",
    //             message: "Ha ocurrido un inconveniente en el servidor",
    //         });
    // }
};

const saveDocument = async (req, res) => {
    const id = req.params.uid;
    const { name } = req.body;
    const file = req.file;

    try {
        let document = {
            name,
            reference: file.filename
        }
        const result = await usersRepository.saveDocument(id, document);
        return res.send({ status: "success", payload: result });

    } catch (error) {
        req.logger.error(error);
        res
            .status(400)
            .send({
                status: "Error",
                message: "Ha ocurrido un inconveniente en el servidor",});
    }
}; 

export {
    getUsers,
    updateRole,
    updateLast_connection,
    saveDocument,
};