import { Resend } from "resend";
// export const resend = new Resend(process.env.RESEND_API_KEY);
export const resend = new Resend("re_PqGi4mWZ_MTWruDt6kkqDpfj19bg5gAVw");





export async function sendEmail(name, email, otp) {
    try {
      await resend.emails.send({
        from: 'StoreX <no-reply@storex.co>',
        to: [email],
        subject: "Your OTP for Registration",
        text: `your OTP for registration is: ${otp}`,
        html: `<p>Hello ${name}, your OTP for registration is: <strong>${otp}</strong></p>`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send OTP.");
    }
  }
