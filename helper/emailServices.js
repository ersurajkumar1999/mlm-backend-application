const { errorResponseMessage, successResponseMessage } = require("./responseMessage");
const nodemailer = require('nodemailer');

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'mail.haritrust.org',
    port: 587,
    secure: false,
    auth: {
        // user: 'jake.hartmann91@ethereal.email',
        // pass: 'cpjKwBExjRUZdYTsWx'
        user: 'info@haritrust.org',
        pass: 'haritrust@1999'
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendMail = async (req, res) => {

    // Email options
    const mailOptions = {
        from: 'info@haritrust.org', // Sender email address
        to: 'er.surajkumar1999@gmail.com', // Recipient email address
        subject: 'jam Email', // Email subject
        text: 'Hello, this is a test email!', // Plain text body
        // You can also use html: '<p>Hello, this is a test email!</p>' for HTML content
    };



    try {
        // Send the email
        const datatt = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // console.error('Error sending email:', error);
                return errorResponseMessage(res, "Something went wrong: " + error);
            }
            // console.log('Email sent:', info);
            res.setHeader('Content-Type', 'text/plain');

            return successResponseMessage(res, "Email Send Successfully!11111", info);
        });
        // console.log("Email Send Successfully!==>")
        // return true;
        return successResponseMessage(res, "Email Send Successfully!", datatt);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = { sendMail }