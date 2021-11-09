const { Order, BookRent, OrderItem, Book, User } = require("../db");
const buildOrderEmail = require("../EmailTemplates/orderConfirmation");

module.exports = async (event, callback, ses) => {
  if (!event.gatewayId) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not available" }),
    });
    return;
  }
  const orders = await Order.findAll({
    where: { gatewayOrderId: event.gatewayId },
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
      { model: User, as: "user", attributes: ["email"] },
    ],
  });

  if (!orders || orders.length == 0) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ code: 0, message: "orderId not valid" }),
    });
    return;
  }

  const mails = orders.map((orderDetails) => ({
    Destination: {
      ToAddresses: [orderDetails.user.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: buildOrderEmail(orderDetails),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Order Confirmation",
      },
    },
    Source: "Order Confirmation <info@martolex.com>",
  }));

  try {
    const mailPromise = mails.map((mail) => ses.sendEmail(mail).promise());
    await Promise.all(mailPromise);
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
};
