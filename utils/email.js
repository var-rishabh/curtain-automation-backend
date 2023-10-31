const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const sendEmailResponse = new Promise((resolve, reject) => {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error("err", err);
                resolve(false);
            } else {
                resolve(true);
            }
        })

    })
    return sendEmailResponse;
}

module.exports = sendEmail;
