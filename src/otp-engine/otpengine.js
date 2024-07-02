// otp-engine.js
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const otpStore = new Map();

export const sendOtp = (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore.set(email, otp);

  const msg = {
    to: email,
    from: process.env.EMAIL_ID_TO_SEND_OTP,
    subject: "Welcome to Laksh's app",
    text: `Your OTP code is ${otp}`,
    html: `<strong>Your OTP code is ${otp}</strong>`,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log('OTP email sent');
      return true;
    })
    .catch((error) => {
      console.error('Error sending OTP email', error);
      return false;
    });
};

export const verifyOtp = (email, otp) => {
  const storedOtp = otpStore.get(email);
  if (storedOtp === otp) {
    otpStore.delete(email);
    return true;
  }
  return false;
};
