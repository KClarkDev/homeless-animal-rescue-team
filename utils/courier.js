const { CourierClient } = require("@trycourier/courier");
require("dotenv").config();

const courier = CourierClient({
  authorizationToken: process.env.COURIER_KEY,
});

async function sendEmail() {
  try {
    const { requestId } = await courier.send({
      message: {
        to: {
          email: "tsc288@gmail.com",
        },
        content: {
          title: "A message from Le Puppy Patisserie",
          body: "Hello, {{name}}! As you know, at Le Puppy Patisserie, we value companionship as well as quality baked goods. That's why Lucy is taking the time to send you this very special email just to say THANK YOU for being awesome!",
        },
        data: {
          name: "Tommy",
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
