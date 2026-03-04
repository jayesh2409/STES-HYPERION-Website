const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-mail", async (req, res) => {
  console.log("REQUEST BODY:", req.body);

  const { name, email, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message from WebSite",
      text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
      `,
    });

    console.log("MAIL SENT:", info.response);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("MAIL ERROR FULL:", err);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});