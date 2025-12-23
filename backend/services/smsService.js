const twilio = require('twilio');

const client = process.env.TWILIO_SID ? twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN) : null;

const sendSMSOTP = async (phone, otp) => {
    if (!client) {
        console.log(`[MOCK SMS] To: ${phone}, OTP: ${otp}`);
        return true; // Return true for mock success if credentials missing
    }

    try {
        const message = await client.messages.create({
            body: `Your Resume Builder OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });
        console.log(message.sid);
        return true;
    } catch (error) {
        console.error("Error sending SMS:", error);
        return false;
    }
};

module.exports = { sendSMSOTP };
