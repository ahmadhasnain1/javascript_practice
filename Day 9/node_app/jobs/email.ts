import mailer from 'nodemailer';
import cron from 'node-cron';
import {Request, Response} from 'express';

// Creating a transporter
const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ahmad.hasnain@invozone.com',
        pass: 'psgehvnrxnnqidjv'
    }
});

function sendEmail(message:string) : any{
    //sending the email
    try{
        transporter.sendMail({
            from: '"Ahmad" <ahmad.hasnain@invozone.com>',
            to: '"Safeer" <safeer.baig@invozone.com>',
            subject: 'Testing Scheduled Email',
            text: message
        })
    }
    catch(e:any){
        console.log(e);
    }
}

const scheduleEmail = (req:Request, res:Response) => {
    try{
        cron.schedule('*/10 * * * *', sendEmail("Hey there, this email was sent to you automatically"));
        res.send('email sent');
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
    scheduleEmail
}
