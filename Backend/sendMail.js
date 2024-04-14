const path = require("path");
const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "fakeblinkscam@gmail.com", // Your email address
    pass: "pvyu yxuq efbz jjnt", // Your password
  },
});

// Function to send the email
const sendMail = async (data) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Shop Smart" <fakeblinkscam@gmail.com>', // Sender address
      to: data.email, // List of receivers
      subject: "Order Confirmation from Shop Smart", // Subject line
      html: `
        <html>
          <head>
            <style>
              .container {
                padding: 20px;
                font-family: Arial, sans-serif;
              }
              .logo {
                margin-bottom: 20px;
              }
              .greeting {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .order-details {
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <img src="cid:logo" alt="Shop Smart Logo" class="logo" width="150" height="auto">
              <div class="greeting">Dear ${data.name},</div>
              <div class="order-details">
                <p>Your order has been confirmed successfully!</p>
                <p><strong>Payment ID:</strong> ${data.paymentId}</p>
                <p><strong>Product Name(s):</strong> ${data.product_name}</p>
                <p><strong>Total Price:</strong> ₹${data.amount}</p>
              </div>
              <p>Thank you for shopping with us!</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: "logo2.png", // Update the filename
          path: path.join(__dirname, "logo2.png"), // Update the path relative to the root directory
          cid: "logo", // Set the Content ID
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
