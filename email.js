require('dotenv').config();
const nodemailer = require('nodemailer');

const email = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
    });

    let info =  transporter.sendMail({
        from: `"Piyush" <${process.env.EMAIL}>`, // sender address
        to: "", // list of receivers
        subject: "Invoice", // Subject line
        text: "Hello world", // plain text body
        html: "<b>Hello world?</b>", // html body
    })
    .then (() => res.send("Success"))
    .catch((err) => res.send(err));
}

module.exports = email;