import { Resend } from "resend";
import EmailTemplate from "@/Email/VerificatonEmail";
const resend = new Resend(process.env.RESEND_API_KEY);




export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["student1742003@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "rahul rawat" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}