import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
const mailTo = process.env.MAIL_TO || "karthikeyanrj78450@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message, _gotcha } = req.body;

    if (_gotcha) {
      return res.status(200).json({ success: true, message: "Spam detected" });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }
    if (message.trim().length > 5000) {
      return res.status(400).json({ success: false, message: "Message too long (max 5000 characters)" });
    }

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [mailTo],
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject?.trim() || "No subject"} - from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Sender Name:</strong> ${name.trim()}</p>
          <p><strong>Sender Email:</strong> ${email.trim()}</p>
          <p><strong>Subject:</strong> ${subject?.trim() || "No subject"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.trim()}</p>
        </div>
      `,
    });

    if (error) {
      return res.status(500).json({ success: false, message: "Failed to send email" });
    }

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
}
