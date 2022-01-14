"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const user_1 = __importDefault(require("../middlewares/user"));
const user_2 = __importDefault(require("../controllers/user"));
const email_1 = __importDefault(require("../jobs/email"));
// define the about route
router.post('/', user_1.default.timeLog, user_2.default.printHelloWorld);
router.get('/getAll', user_2.default.getAllUsers);
router.get('/getOne/:user_id', user_2.default.getUser);
router.post('/create', user_1.default.validateUserCreate, user_2.default.createUser);
router.post('/delete', user_2.default.deleteUser);
router.post('/update', user_2.default.updateUser);
router.post('/sendEmail', email_1.default.scheduleEmail);
module.exports = router;
