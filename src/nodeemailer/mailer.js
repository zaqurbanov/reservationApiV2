const nodemailer = require('nodemailer')
//nodemailer paketini yukledikden sonra . 
//test ucun etheralemail.com saytindan istifade olunur. createEmail clikcledikden sonra yeni  transportumuzu yaziriq. 
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'shana66@ethereal.email',
        pass: 'daU42UPDg1CehaFFD4'
    }
});

module.exports = transporter;