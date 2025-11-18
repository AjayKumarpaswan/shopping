import dotenv from "dotenv";
dotenv.config();


import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


const testEmail = async () => {
  try {

   
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL port
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: "arvindkumar20102000@gmail.com",
      subject: "Test Email",
      text: "Hello! This is a test email from Nodemailer.",
    });

    console.log("✅ Test email sent!");
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

testEmail();
