

import nodemailer from "nodemailer";


export const sendEmail = async (toEmail, subject, htmlContent) => {
  // Transporter setup
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail service
    auth: {
      user: process.env.EMAIL_USER, // Tumhara email
        pass: process.env.EMAIL_KEY, // Gmail App Password
    },
  });

  // Mail options
  const mailOptions = {
    from: 'Quickcart no-reply@quickcart.com', // Sender email
    to: toEmail, // Receiver email
    subject: subject, // Email subject
    html: htmlContent, // HTML content of the email
  };

  // Send email
  return await transporter.sendMail(mailOptions);
};
