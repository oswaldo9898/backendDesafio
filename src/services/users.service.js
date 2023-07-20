import Users from "../dao/dbManager/users.js"
import UsersRepository from '../repository/users.repository.js';
import CurrentDto from '../dao/DTOs/current.dto.js';
import { sendEmailDeletAccount } from '../utils/sendEmail/index.js';

const usersManager = new Users();
const usersRepository = new UsersRepository(usersManager);


const getUsers = async (limit, page, query, sort) => {
    const users = await usersRepository.getUsers(limit, page, query, sort);
    return users;
};



const getAllUsers = async () => {
    const resUser = [];
    const users = await usersRepository.getAllUsers();
    users.map(user => {
        const currentDto = new CurrentDto(user);
        resUser.push(currentDto);
    });
    return resUser;
};



const updateRole = async (id, role) => {

    const user = await usersRepository.getUser(id);
    const documents = user.documents;

    if (documents.length === 3) {
        const result = await usersRepository.updateRole(id, role);
        return result;
    }
    return null;
};




const saveDocument = async (id, name, file) => {
    let document = {
        name,
        reference: file.filename
    }
    const result = await usersRepository.saveDocument(id, document);
    return result;
};


const getDocuments = async(uid) => {
    const userDocuments = await usersRepository.getDocuments(uid);
    return userDocuments;
}


const deleteUsers = async () => {

    const users = await usersRepository.getAllUsers();
    users.map(async (user) => {
        let fecha_actual = new Date();

        if (user.last_connection) {
            let tiempo = fecha_actual - user.last_connection;
            let horas = Math.round(tiempo / (1000 * 60 * 60));

            if (horas > 48) {
                sendEmailDeletAccount(user.email);
                await usersRepository.deleteUser(user._id);
            }
        }
    });
    return 'Eliminacion exitosa';
};



const deleteUser = async (uid) => {
    const respon = await usersRepository.deleteUser(uid);
    return respon;
};

export {
    getUsers,
    getAllUsers,
    updateRole,
    saveDocument,
    getDocuments,
    deleteUsers,
    deleteUser
};