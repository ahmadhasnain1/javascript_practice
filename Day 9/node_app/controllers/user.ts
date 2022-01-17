const UserModel = require('../models').User;
const PostModel = require('../models').Post;
import {Request, Response} from 'express';


const printHelloWorld = (req:Request, res:Response) => {
    res.send('\n hello world')
};

const getAllUsers = async(req:Request, res:Response) => {
  try{
      let users = await UserModel.findAll({
          include: [{
            model: PostModel,
            as: 'userPosts',
          }],
        });
      res.send(users);
  }
  catch(e:any){
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}

const getUser = async(req:Request, res:Response) => {
  try{
      const user = await UserModel.findOne({
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
  catch(e:any){
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}

const createUser = async(req:Request, res:Response) => {
  try{
     let user = await UserModel.create({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      })
      res.status(201).send(user);
  }
  catch(e:any){
      if (e.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          msg: e.errors.map((err:any) => err.message)
        })
      }
      else if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}

const updateUser = async(req:Request, res:Response) => {
  try{
      interface object1{
        firstName?:string,
        lastName?:string,
        email?:string,
        password?:string
      };
      let object : object1 = {};
      if(req.body.firstName!=null)  object.firstName = req.body.firstName;
      if(req.body.lastName!=null)  object.lastName = req.body.lastName;
      if(req.body.email!=null)  object.email = req.body.email;
      if(req.body.password!=null)  object.password = req.body.password;
      console.log(object);
      UserModel.update(object,{
        where: {
          id: req.body.user_id
        }
      });
      res.send('User updated successfully');
  }
  catch(e:any){
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}

const deleteUser = async(req:Request, res:Response) => {
  try{
      UserModel.destroy({
        where: {
          id: req.body.user_id
        }
      });
      res.send('User deleted successfully');
  }
  catch(e:any){
      if(!e.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
      } else {
          res.status(e.status).json( { error: { code: e.code, message: e.message } });
      }
  }
}


export default {
    printHelloWorld,
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};