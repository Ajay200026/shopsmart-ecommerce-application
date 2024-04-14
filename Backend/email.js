const express = require("express");
const bodyParser = require("body-parser");
const sendMail = require("./sendMail"); // Assuming you have the sendMail function implemented
const cors = require("cors");
const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(cors());
// Endpoint to handle sending emails
app.post("/send-email", (req, res) => {
  const { name, email, paymentId, product_name, amount } = req.body;

  try {
    // Send email
    sendMail({
      name,
      email,
      paymentId,
      product_name,
      amount,
    });

    // Respond to the frontend
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
