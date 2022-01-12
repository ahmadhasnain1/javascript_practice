var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/user');
const userController = require('../controllers/user');

// define the about route
router.post('/', middleware.timeLog, userController.printHelloWorld);
router.get('/getAll', userController.getAllUsers);
router.get('/getOne/:user_id', userController.getUser);
router.post('/create', middleware.validateUserCreate ,userController.createUser);
router.post('/delete', userController.deleteUser);
router.post('/update', userController.updateUser);

module.exports = router