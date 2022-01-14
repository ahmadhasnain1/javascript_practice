import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

const timeLog = (req:Request, res:Response, next:NextFunction) => {
  console.log('before timelog');   //pre
  console.log('Time: ', Date.now());
  next();
  console.log('after timelog');   //post
  return;
};


const validateUserCreate = (req:Request, res:Response, next:NextFunction) => {
  try{
      const schema = Joi.object().keys({
        first_name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
        last_name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(30).required()
      });
      const result = schema.validate(req.body); 
      if(result.error == null)  //means valid
        next();
      else
        return res.status(400).json({
        success: false,
        msg: result.error.details.map(i => i.message).join(',')})
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
  timeLog,
  validateUserCreate
}