var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/test');
const testController = require('../controllers/test');

// define the about route
router.post('/', middleware.timeLog, testController.printHelloWorld);
router.get('/getAll', testController.getAllUsers);
router.get('/getOne/:user_id', testController.getUser);
router.post('/create', testController.createUser);
router.post('/delete', testController.deleteUser);
router.post('/update', testController.updateUser);

module.exports = router