import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5174" }));
app.use(express.json());

// Gmail App Password required (2-Step Verification must be enabled).
// Generate one at: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject?.trim() || "New Message"} - from ${name.trim()}`,
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
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Failed to send contact email:", err.message);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
