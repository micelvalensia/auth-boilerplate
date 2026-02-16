import { emailTransporter } from "../config/email.js";

export const sendEmail = async ({ to, subject, text, html, from }) => {
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
  } catch (error) {
    console.error("Error sending email:", {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
