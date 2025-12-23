const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmailOTP = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"Resume Builder" <${process.env.SMTP_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Your Login OTP", // Subject line
            text: `Your OTP for Resume Builder is: ${otp}. It expires in 5 minutes.`, // plain text body
            html: `<b>Your OTP for Resume Builder is: ${otp}</b><br>It expires in 5 minutes.`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = { sendEmailOTP };
