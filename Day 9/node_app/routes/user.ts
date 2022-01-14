import express from 'express';
var router = express.Router()
import middleware from '../middlewares/user';
import userController from '../controllers/user';
import emailJob from '../jobs/email';

// define the about route
router.post('/', middleware.timeLog, userController.printHelloWorld);
router.get('/getAll', userController.getAllUsers);
router.get('/getOne/:user_id', userController.getUser);
router.post('/create', middleware.validateUserCreate ,userController.createUser);
router.post('/delete', userController.deleteUser);
router.post('/update', userController.updateUser);

router.post('/sendEmail', emailJob.scheduleEmail);

export = router