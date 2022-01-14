"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require('../../models').User;
const PostModel = require('../../models').Post;
const printHelloWorld = (req, res) => {
    res.send('\n hello world');
};
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield UserModel.findAll({
            include: [{
                    model: PostModel,
                    as: 'userPosts',
                }],
        });
        res.send(users);
    }
    catch (e) {
        if (!e.status) {
            res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
        }
        else {
            res.status(e.status).json({ error: { code: e.code, message: e.message } });
        }
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.findOne({
            where: {
                id: req.params.user_id
            }
        });
        if (user === null) {
            res.send('user not found against that id');
        }
        else
            res.send(user);
    }
    catch (e) {
        if (!e.status) {
            res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
        }
        else {
            res.status(e.status).json({ error: { code: e.code, message: e.message } });
        }
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield UserModel.create({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send(user);
    }
    catch (e) {
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: e.errors.map((err) => err.message)
            });
        }
        else if (!e.status) {
            res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
        }
        else {
            res.status(e.status).json({ error: { code: e.code, message: e.message } });
        }
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let object = {};
        if (req.body.firstName != null)
            object.firstName = req.body.firstName;
        if (req.body.lastName != null)
            object.lastName = req.body.lastName;
        if (req.body.email != null)
            object.email = req.body.email;
        if (req.body.password != null)
            object.password = req.body.password;
        console.log(object);
        UserModel.update(object, {
            where: {
                id: req.body.user_id
            }
        });
        res.send('User updated successfully');
    }
    catch (e) {
        if (!e.status) {
            res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
        }
        else {
            res.status(e.status).json({ error: { code: e.code, message: e.message } });
        }
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        UserModel.destroy({
            where: {
                id: req.body.user_id
            }
        });
        res.send('User deleted successfully');
    }
    catch (e) {
        if (!e.status) {
            res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
        }
        else {
            res.status(e.status).json({ error: { code: e.code, message: e.message } });
        }
    }
});
exports.default = {
    printHelloWorld,
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};
