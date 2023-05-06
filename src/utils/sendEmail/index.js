import { transporter } from './mailer.js';
import config from '../../config/config.js';
import __dirname from './../../utils.js';

export const sendEmail = async (ticket) => {
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