import { plans } from "./enums";

export const getMinPlan = ({ rent, isBuyBackEnabled }) => {
  if (!isBuyBackEnabled) {
    return plans.SELL;
  } else {
    let min = Number.MAX_VALUE;
    let minPlan = "";
    Object.values(plans).forEach((key) => {
      if (rent[key] < min) {
        min = rent[key];
        minPlan = key;
      }
    });
    return minPlan;
  }
};

export const getProductPrice = (plan, rent, isBuyBackEnabled) => {
  return isBuyBackEnabled && plan.plan !== plans.SELL
    ? rent.deposit
    : plan.rent;
};

export const getRefundAmount = (rent, plan) => {
  return rent.deposit - plan.rent;
};

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
    case plans.SELL:
      return "BUY";
    default:
      return "custom plan";
  }
};

export const getMinProductPrice = ({ rent, isBuyBackEnabled }) => {};
