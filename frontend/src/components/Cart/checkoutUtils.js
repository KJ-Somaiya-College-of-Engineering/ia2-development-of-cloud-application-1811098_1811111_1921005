import moment from "moment";
import { ordersApi } from "../../utils/endpoints";
import { get } from "../../utils/requests";

export const mapPlanToText = (plan) => {
  switch (plan) {
    case "oneMonth":
      return "1 Month Plan";
    case "threeMonth":
      return "3 Months Plan";
    case "sixMonth":
      return "6 Month Plan";
    case "nineMonth":
      return "9 Month Plan";
    case "twelveMonth":
      return "12 Month Plan";
    default:
      return "custom plan";
  }
};

export const getDeliveryCost = async () => {
  const [deliveryCharges] = await get(ordersApi.getDeliveryCharges);
  return deliveryCharges;
};

export const getDeliveryDate = () => {
  const minExpected = moment(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
  const maxExpected = moment(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

  if (
    minExpected.format("YYYY") !== maxExpected.format("YYYY") ||
    minExpected.format("M") !== maxExpected.format("M")
  ) {
    return (
      minExpected.format("DD-MMM-YYYY") +
      " to " +
      maxExpected.format("DD-MMM-YYYY")
    );
  } else {
    return `${minExpected.format("Do")} to ${maxExpected.format(
      "Do MMM YYYY"
    )}`;
  }
};

export const convertDate = (string) => {
  const date = moment(string);
  return date.format("Do MMMM, YYYY");
};

export const getOrderTotal = (items = [], deliveryCharges = 0) => {
  const total = items.reduce(
    (total, item) => total + item.qty * item.deposit,
    0
  );
  return (total + deliveryCharges).toFixed(2);
};

export const getRefundAmount = (rent, deposit) => {
  return deposit - rent;
};

export const formatDeliveryDate = (start, end) =>
  moment(start).format("DD/MM/YYYY") + " - " + moment(end).format("DD/MM/YYYY");
