"use server";

import { Resend } from "resend";

export async function sendEmail(from: string, to: string, subject: string, body: string) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY!);

        console.log("Sending email with Resend...", { from, to, subject, body });

        const res = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: `<p>${body}</p>`
        });

        console.log("Email sent successfully:", res);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}