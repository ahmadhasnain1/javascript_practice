"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const node_cron_1 = __importDefault(require("node-cron"));
// Creating a transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'ahmad.hasnain@invozone.com',
        pass: 'psgehvnrxnnqidjv'
    }
});
function sendEmail(message) {
    //sending the email
    try {
        transporter.sendMail({
            from: '"Ahmad" <ahmad.hasnain@invozone.com>',
            to: '"Safeer" <safeer.baig@invozone.com>',
            subject: 'Testing Scheduled Email',
            text: message
        });
    }
    catch (e) {
        console.log(e);
    }
}
const scheduleEmail = (req, res) => {
    try {
        node_cron_1.default.schedule('*/10 * * * *', sendEmail("Hey there, this email was sent to you automatically"));
        res.send('email sent');
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
    scheduleEmail
};
