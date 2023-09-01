const { CourierClient } = require("@trycourier/courier");
require("dotenv").config(); // Provides API key

const courier = CourierClient({
  authorizationToken: process.env.COURIER_KEY,
});

// email address is hard-coded for testing purposes
async function sendEmail(user_name /*user_email*/) {
  try {
    console.log(`The users name is: ${user_name}`);
    const { requestId } = await courier.send({
      message: {
        to: {
          email: "kec0892@gmail.com",
          //email: user_email
        },
        content: {
          title: "A message from Homeward Bound Animal Shelter",
          body: "Hello, {{name}}! From the bottom of our hearts, and theirs, we thank you for considering adoption!",
        },
        data: {
          name: user_name,
        },
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });
    console.log("Email sent!");
    console.log(requestId);
    return requestId;
  } catch (err) {
    console.log("ERR", err);
  }
}

sendEmail();

module.exports = sendEmail;
