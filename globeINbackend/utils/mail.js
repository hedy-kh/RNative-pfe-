const nodemailer =require('nodemailer');
exports.generateOTP =()=>{
    let otp ='' ;
    for(let i =0;i<=3;i++){
     const randVal= Math.round(Math.random()*9);
     otp+=randVal;
    }
    return otp;
};
exports.mailTransport=()=> nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env. MAILTRAP_PASSWORD
        }
      });
      
exports.generateEmailTemplate = code =>{
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
          body {
              background-color: #fafbfc;
              margin: 0;
              padding: 0;
              font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
          }
  
          .container {
              max-width: 600px;
              text-align: center;
          }
  
          .logo {
              padding: 25px;
              width: 125px;
              margin: 0 auto;
              display: block;
          }
  
          .content {
              background-color: #fff;
              padding-bottom: 20px;
              padding-top: 20px;
          }
  
          .message {
              font-size: 16px;
              padding-left: 25px;
              padding-right: 25px;
          }
  
          .verification-code {
              font-size: 24px;
              font-weight: bold;
              background-color: gold;
              padding: 15px;
              display: inline-block;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <img class="logo" src="https://global-uploads.webflow.com/5f059a21d0c1c3278fe69842/5f188b94aebb5983b66610dd_logo-arengu.png"
              alt="Logo">
          <div class="content">
              <div class="message">
                  <p>Hello,</p>
                  <p>Please use the verification code below on the <span style="color: gold;">GlobeIn</span> website:</p>
              </div>
              <div class="verification-code">${code}</div>
              <div class="message">
                  <p>If you didn't request this, you can ignore this email or let us know.</p>
                  <p>Thanks! <br /><span style="color: gold;">GlobeIn</span> team</p>
              </div>
          </div>
      </div>
  </body>
  
  </html>  
  `
};
exports.plainEmailTemplate = (heading, message) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
      </head>
      
      <body style="background-color: #fafbfc; margin: 0; padding: 0; font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; text-align: center;">
              <h2>${heading}</h2>
              <p>${message}</p>
          </div>
      </body>
      
      </html>
  `;
};
exports.generatePasswordResetTemplate = url => {
  return `
    <html>
      <head>
        <style>
          .button {
            display: inline-block;
            font-size: 16px;
            color: #ffffff;
            background-color: #ff0000;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Hi User</h1>
        <br/>
        You recently requested a password reset here at GMALL.<br/>
        Click the button below to complete your password reset.<br/>
        <a class="button" href="${url}">Reset Password</a><br/>
        If you did not request a password reset, please ignore this message.<br/>
      </body>
    </html>
  `;
};
exports.ResetPasswordEmailSuccess = (heading, msg) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            padding: 20px;
            text-align: center;
            background-color: #fafbfc;
          }
          .success-message {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #20c997;
          }
          .message {
            text-align: center;
            font-size: 16px;
            padding: 0 25px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${heading}</h1>
          </div>
          <div class="success-message">${msg}</div>
          <div class="message">
            <p>Your password has been successfully reset.</p>
            <p>If you have any questions, feel free to contact us.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};


