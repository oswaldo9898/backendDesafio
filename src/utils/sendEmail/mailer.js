import nodemailer from 'nodemailer';
import config from '../../config/config.js';


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, //465
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.nodemailerEmail, // generated ethereal user
    pass: config.nodemailerPassword, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify().then(() => {
  console.log('Nodemailer esta corriendo');
});

export {
  transporter
}