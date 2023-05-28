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




export {
    getUsers,
};