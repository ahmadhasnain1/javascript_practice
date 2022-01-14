"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const timeLog = (req, res, next) => {
    console.log('before timelog'); //pre
    console.log('Time: ', Date.now());
    next();
    console.log('after timelog'); //post
    return;
};
const validateUserCreate = (req, res, next) => {
    try {
        const schema = joi_1.default.object().keys({
            first_name: joi_1.default.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
            last_name: joi_1.default.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(5).max(30).required()
        });
        const result = schema.validate(req.body);
        if (result.error == null) //means valid
            next();
        else
            return res.status(400).json({
                success: false,
                msg: result.error.details.map(i => i.message).join(',')
            });
    }
    catch (e) {
        if (!e.status) {
            res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
        }
        else {
            res.status(e.status).json({ error: { code: e.code, message: e.message } });
        }
    }
};
exports.default = {
    timeLog,
    validateUserCreate
};
