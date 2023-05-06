import font from 'pdfmake/build/vfs_fonts.js'

const fonst = {
    Roboto: {
        normal: Buffer.from(
            font.pdfMake.vfs["Roboto-Regular.ttf"],
            "base64"
        ),
        bold: Buffer.from(
            font.pdfMake.vfs["Roboto-Medium.ttf"],
            "base64"
        ),
    },
};

export default fonst;