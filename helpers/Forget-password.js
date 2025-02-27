import nodemailer from "nodemailer";

export const SendForgetPasswordEmail = async (toEmail, subject, htmlContent) => {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Tumhara email
        pass: process.env.EMAIL_KEY, // Gmail App Password
      },
    });

    const mailOptions = {
      from: `"StoreX Support" <no-reply@storex.com>`, // Sender email
      to: toEmail, // Receiver email
      subject: subject, // Email subject
      html: htmlContent, // Email body (HTML)
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  
};
