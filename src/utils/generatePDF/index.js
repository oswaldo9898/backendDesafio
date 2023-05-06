import content from './pdfContent.js';
// import pdfMake from 'pdfmake/build/pdfmake.js';
import PdfPrinter from "pdfmake";
import fonts from './fonts.js';
import __dirname from './../../utils.js';
import fs from 'fs';


const buildTableBody = (data, columns) => {
    var body = [];
    body.push(columns);
    data.forEach(function(row) {
        var dataRow = [];
        columns.forEach(function(column) {
            dataRow.push(row[column]?.toString());
        })
        body.push(dataRow);
    });
    return body;
}


const table = (data, columns) => {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
        }
    };
}


export const createPDF = (ticket) => {
    let datos_detalle = []
    ticket.products.forEach(element => {
        let datos = {};
        datos.Producto = element.product.title;
        datos.Cantidad = element.quantify;
        datos.PrecioUni = element.product.price;
        datos.Subtotal = (element.product.price * element.quantify)
        datos_detalle.push(datos);
    });

    const printer = new PdfPrinter(fonts)
    const docDefinition = {
        content: [
            {text: "Tienda OnLine", style: "header"},
            {text: "Nota de venta", style: "header"},
            {text: "Huaquillas - El Oro - Ecuador", style: "header"},
            " ",
            table(datos_detalle, ['Producto', 'Cantidad', 'PrecioUni', 'Subtotal']),
            " ",
            `El total de la compra es de $ ${ticket.amount}`,
        ]
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(`${__dirname}/public/ticketsPDF/${ticket._id}.pdf`));
    pdfDoc.end();
}