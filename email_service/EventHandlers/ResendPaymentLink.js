const { Order, BookRent, OrderItem, Book, User } = require("../db");
const buildResendPaymentLink = require("../EmailTemplates/ResendPaymentLink");

module.exports = async (event, callback, ses) => {
  if (!event.orderId) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not available" }),
    });
    return;
  }
  console.log("retrieve order");

  const orderDetails = await Order.findByPk(event.orderId, {
    attributes: ["deliveryAmount"],
    include: [
      {
        model: OrderItem,
        as: "items",
        include: {
          model: Book,
          as: "book",
          attributes: ["name"],
          include: { model: BookRent, as: "rent" },
        },
      },
      { model: User, as: "user", attributes: ["email", "name"] },
    ],
  });
  console.log("check validity");
  if (!orderDetails) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not valid" }),
    });
    return;
  }

  var params = {
    Destination: {
      ToAddresses: [orderDetails.user.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: buildResendPaymentLink(orderDetails, event.paymentLink),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Retry payment for Your Order",
      },
    },
    Source: "Retry Payment <info@martolex.com>",
  };

  try {
    console.log("send email");
    await ses.sendEmail(params).promise();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ code: 1, message: "email sent" }),
    });
  } catch (err) {
    console.log(err);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        code: 0,
        message: "email not sent",
        err: err.message,
      }),
    });
  }
};
