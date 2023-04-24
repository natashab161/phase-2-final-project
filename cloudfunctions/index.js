const functions = require("firebase-functions");
const admin = require("firebase-admin")
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

sgMail.setApiKey(functions.config().sendgrid.key);

const welcomeEmail = functions.auth.user().onCreate((user) => {
    const msg = {
      to: user.email,
      from: "matthewrobertmacfarlane@gmail.com", // Replace with your own email address or a verified sender
      subject: "Welcome to pullUp NYC!",
      text: `Welcome, ${user.displayName || user.email}! Thanks for signing up for our app. We hope you enjoy using it.`,
      html: `<p>Welcome, <strong>${user.displayName || user.email}</strong>! Thanks for signing up for our app. We hope you enjoy using it.</p>`,
    };
  
    return sgMail.send(msg).then(() => {
      console.log("Welcome email sent to:", user.email);
    }).catch((error) => {
      console.error("Error sending welcome email:", error);
    });
  });
  
  exports.welcomeEmail = welcomeEmail;
  