const db = require("./connection");
const { Model, DataTypes, Sequelize, UUIDV4 } = require("sequelize");
const { paymentModes, paymentStatus } = require("./utils/enums");

class Order extends Model {}

Order.init(
  {
    id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
    paymentMode: {
      type: DataTypes.STRING,
      validate: { isIn: [Object.values(paymentModes)] },
    },
    paymentStatus: {
      type: DataTypes.STRING,
      isIn: [Object.values(paymentStatus)],
      defaultValue: paymentStatus.PENDING,
    },
    gatewayRefId: { type: DataTypes.STRING },
    gateWayMode: { type: DataTypes.STRING },
    gatewayOrderId: { type: DataTypes.STRING },
    deliveryMinDate: { type: DataTypes.DATE },
    deliveryMaxDate: { type: DataTypes.DATE },
    actualDeliveryDate: { type: DataTypes.DATE },
    deliveryAmount: { type: DataTypes.FLOAT },
  },
  {
    sequelize: db,

    defaultScope: {},
  }
);

module.exports = Order;
