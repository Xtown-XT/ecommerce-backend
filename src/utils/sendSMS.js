// import twilio from "twilio";
// import dotenv from "dotenv";
// dotenv.config();

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// export const sendSMS = async (phone, otp) => {
//   await client.messages.create({
//     body: `Your OTP is ${otp}`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phone, // Must include country code like "+14155552671"
//   });
// };

import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (phone, otp) => {
  try {
    // Make sure phone includes country code
    const toPhone = phone.startsWith("+") ? phone : `+91${phone}`; // adjust +91 for your country

    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toPhone,
    });

    console.log(`OTP sent to ${toPhone}`);
  } catch (error) {
    console.error("Twilio SMS Error:", error.message);
    throw error;
  }
};

