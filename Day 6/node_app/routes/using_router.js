var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/test');
const testController = require('../controllers/test');

// define the about route
router.post('/', middleware.timeLog, testController.printHelloWorld);
router.get('/getAll', testController.getUsers);
router.post('/create', testController.createUser);


module.exports = router