const nodemailer = require('nodemailer');

const option = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(option);

// send mail
const senEmail = async ({ to, subject, text, html, ...rest }) => {
    try {
        const res = await transporter.verify();
        if (res) {
            const mail = {
                from: ''
            }
        }
    } catch (error) {
        
    }
}