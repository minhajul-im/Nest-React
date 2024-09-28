"use server";

import { Resend } from "resend";
import { emailPrivetKey } from "@/services/constant";
import { EmailTemplate } from "@/components/email/email-template";

type EmailType = {
  name: string;
  email: string;
  message: string;
};

const resend = new Resend(emailPrivetKey);

export const sendEmail = async (data: EmailType) => {
  try {
    const result = await resend.emails.send({
      from: `${data.name} <onboarding@resend.dev>`,
      to: ["minhajul.cpp@gmail.com"],
      subject: `Inquiry About Our Leather and Jute Products from ${data.name}!`,
      react: EmailTemplate({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    console.log(result);

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error };
  }
};
