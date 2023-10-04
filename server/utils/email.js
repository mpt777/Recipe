import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

export let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mptaylor777@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});
 
// let mailDetails = {
//     from: 'mptaylor777@gmail.com',
//     to: 'mptaylor777@gmail.com',
//     subject: 'Test mail',
//     text: 'Node.js testing mail for GeeksforGeeks'
// };
 
// mailTransporter.sendMail(mailDetails, function(err, data) {
//     if(err) {
//         console.log('Error Occurs');
//     } else {
//         console.log('Email sent successfully');
//     }
// });
