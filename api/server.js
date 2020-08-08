const axios = require("axios");

const obj = {
  subject: "SendGrid Template Demo",
  heading: "Welcome to my Page",
  description: "here is an example of the data im gonna be sending to you",
};

const callMethod = (email, token) => {
  axios({
    method: "POST",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      "content-type": "application/json",
      Authorization: process.env.SENDGRID_KEY,
    },
    data: {
      personalizations: [
        {
          to: [
            {
              email: email,
              name: "testing",
            },
          ],
          subject: `${obj.subject}`,
        },
      ],
      from: {
        email: process.env.SENDER,
        name: "anthony",
      },
      content: [
        {
          type: "text/html",
          value: `
   <!DOCTYPE html>
   <html>
      <body>
         <h1>${obj.heading} </h1>
         <a href="localhost:4000/register/${token}">click here ${token}</a>
         <p>${obj.description}</p>
      </body>
   </html>
`,
        },
      ],
    },
  })
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

module.exports = callMethod;
