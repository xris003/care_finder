const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Gabriel Chris <hello@gabby.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `Jonas Schmedtman <${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     if (process.env.NODE_ENV === "production") {
//       // Sendgrid
//       return 1;
//     }

//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async send(template, subject) {
//     //Send actual email
//     //1) Render HTML based on a pug template
//     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//       firstName: this.firstName,
//       url: this.url,
//       subject,
//     });

//     // 2) Define email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: convert(html),
//     };

//     // 3) Create a transport and send email
//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     this.send("welcome", "Welcome to the Care Finder Family");
//   }

//   async sendPasswordReset() {
//     await this.send(
//       "passwordReset",
//       "Your password resend token valid for only 10mins"
//     );
//   }
// };
