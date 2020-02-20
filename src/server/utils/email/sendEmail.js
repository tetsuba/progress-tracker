// TODO:
// - Create email template
// - Create a none reply email
// - Create token with 12 hours expire
// - Create Route to confirm token

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.REACT_APP_NODE_MAIL_SERVICE,
    auth: {
        user: process.env.REACT_APP_NODE_MAIL_ADDRESS,
        pass: process.env.REACT_APP_NODE_MAIL_ADDRESS_PASSWORD,
    }
});

module.exports = {
    sendMail: (token, template) => {

        const emailTemplate = {
            confirmEmail: {
                html: `
                    <h1>Progress Tracker</h1>
                    <p>Click on the link below to confirm your email address</p>
                    <a href="http://localhost:3000/confirm/${encodeURIComponent(token)}">Confirm</a>
                `,
                subject: 'Progress tracker confirm your email'
            },
            resetPassword: {
                html: `
                    <h1>Progress Tracker</h1>
                    <p>Click on the link below to reset your password</p>
                    <a href="http://localhost:3000/reset/${encodeURIComponent(token)}">Confirm</a>
                `,
                subject: 'Progress tracker confirm your email'
            }
        };

        const mailOptions = {
            from: process.env.REACT_APP_NODE_MAIL_ADDRESS,
            to: 'ryanmarchock@gmail.com',
            subject: emailTemplate[template].subject,
            html: emailTemplate[template].html,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};

