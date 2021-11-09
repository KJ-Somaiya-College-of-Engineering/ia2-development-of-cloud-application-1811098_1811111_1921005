const BuildForgotPasswordEmail = require("../EmailTemplates/BuildForgotPasswordEmail");

const ForgotPassword = async (event, callback, ses) => {
  if (event.email && event.link) {
    var params = {
      Destination: {
        ToAddresses: [event.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: BuildForgotPasswordEmail(event.link),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Password reset",
        },
      },
      Source: "Martolex Password Reset <info@martolex.com>",
    };

    try {
      await ses.sendEmail(params).promise();

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ code: 1, message: "email sent" }),
      });
    } catch (err) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          code: 0,
          message: "email not sent",
          err: err.message,
        }),
      });
    }
  } else {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "email or link not present" }),
    });
  }
};

module.exports = ForgotPassword;
