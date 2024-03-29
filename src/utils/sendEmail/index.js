import { transporter } from './mailer.js';
import config from '../../config/config.js';
import {__dirname }from './../../utils.js';

const sendEmailTicket = async (ticket) => {
  try {
    await transporter.sendMail({
      from: `Tienda online" <${config.nodemailerEmail}>`, // sender address
      to: ticket.purchaser, // list of receivers
      subject: "Ticket de compra ✔", // Subject line
      html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
            <tr>
              <td style="background-color: #ecf0f1">
                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                  <h2 style="color: #e67e22; margin: 0 0 7px">Hola</h2>
                  <p style="margin: 2px; font-size: 15px">
                    Tienda Online te agradece por la preferencia, y desea que tú experiencia con nosotros sea la mejor.</p></br>
                  <p style="margin: 2px; font-size: 15px">
                    Muchas gracias por su compra, a continuación anexamos un archivo con la nota de compra</p>
                  <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">TIENDA ONLINE 2023</p>
                </div>
              </td>
            </tr>
          </table>`, // html body
      attachments: [
        { filename: `ticket-${ticket._id}.pdf`, path: `${__dirname}/public/ticketsPDF/${ticket._id}.pdf`}
      ]
    })
  } catch (error) {
    console.log(error);
  }
}


const sendEmailResetPassword = async (email, token) => {
  try {
    await transporter.sendMail({
      from: `Tienda online" <${config.nodemailerEmail}>`, // sender address
      to: email, // list of receivers
      subject: "Recuperar contraseña", // Subject line
      html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
      <tr>
        <td style="background-color: #ecf0f1">
          <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
            <h2 style="color: #e67e22; margin: 0 0 7px">Hola ${email}</h2>
            <p style="margin: 2px; font-size: 15px">
              Tienda online te agradece por la preferencia, y desea que tú experiencia con nosotros sea la mejor.</p></br>
            <p style="margin: 2px; font-size: 15px">
              Para continuar con tu solicitud de Recuperar Contraseña</p>
            <p style="margin: 2px; font-size: 15px">
              LA DURACIÓN DE ESTE ENLACE ES DE 1 HORA, PASADO ESTE TIEMPO DEBERA GENERAR UN NUEVO ENLACE</p>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="https://backenddesafio-development.up.railway.app/cambiar-password?user=${token}">CLIC AQUÍ</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">TIENDA ONLINE 2023</p>
          </div>
        </td>
      </tr>
    </table>`, // html body
    })
  } catch (error) {
    console.log(error);
  }
}



const sendEmailDeletAccount = async (email) => {
  try {
    await transporter.sendMail({
      from: `Tienda online" <${config.nodemailerEmail}>`, // sender address
      to: email, // list of receivers
      subject: "IMPORTANTE: Eliminiación de cuenta", // Subject line
      html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
      <tr>
        <td style="background-color: #ecf0f1">
          <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
            <h2 style="color: #e67e22; margin: 0 0 7px">Hola ${email}</h2>
            <p style="margin: 2px; font-size: 15px">
              Tienda online te agradece por la preferencia, y desea que tú experiencia con nosotros haya sido la mejor.</p></br>
            <p style="margin: 2px; font-size: 15px">
              Mediante este medio le comunicamos que su cuenta ha sido eliminada por inactividad.</p>
            <p style="margin: 2px; font-size: 15px">
              Recuerde que puede volver a crear una nueva cuenta en nuestro sitio.</p>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="https://backenddesafio-development.up.railway.app/register">REGISTRARSE</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">TIENDA ONLINE 2023</p>
          </div>
        </td>
      </tr>
    </table>`, // html body
    })
  } catch (error) {
    console.log(error);
  }
}


const sendEmailDeletProduct = async (email, product) => {
  try {
    await transporter.sendMail({
      from: `Tienda online" <${config.nodemailerEmail}>`, // sender address
      to: email, // list of receivers
      subject: "IMPORTANTE: Eliminiación de producto", // Subject line
      html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
      <tr>
        <td style="background-color: #ecf0f1">
          <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
            <h2 style="color: #e67e22; margin: 0 0 7px">Hola ${email}</h2>
            <p style="margin: 2px; font-size: 15px">
              Tienda online te agradece por formar de nuestra plataforma y esperamos que tengas una buena experiencia.</p></br>
            <p style="margin: 2px; font-size: 15px">
              Mediante este medio le comunicamos que su el producto <strong>${product}</strong> ha sido eliminada de la plataforma.</p>
            <p style="margin: 2px; font-size: 15px">
              Recuerde que puede volver a publicar un producto en el sitio.</p>
            <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
              <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="http://localhost:8080/administrar">PRODUCTOS</a>	
            </div>
            <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">TIENDA ONLINE 2023</p>
          </div>
        </td>
      </tr>
    </table>`, // html body
    })
  } catch (error) {
    console.log(error);
  }
}


export {
  sendEmailTicket,
  sendEmailResetPassword,
  sendEmailDeletAccount,
  sendEmailDeletProduct,
}