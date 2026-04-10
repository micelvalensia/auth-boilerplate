import { emailTransporter } from "../config/email.js";

interface MailError extends Error {
  code?: string;
  command?: string;
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  from,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  from?: string;
}) => {
  try {
    const transporter = emailTransporter();

    const fromEmail = process.env.EMAIL_FROM;

    const mailOptions = {
      from: fromEmail,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return { success: true, messageId: info.messageId, info };
  } catch (err) {
    const error = err as MailError;
    console.error("Error sending email:", {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
