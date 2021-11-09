const plans = {
  MONTHLY: "oneMonth",
  QUATERLY: "threeMonth",
  SEMIANNUAL: "sixMonth",
  NINEMONTHS: "nineMonths",
  ANNUAL: "twelveMonths",
  SELL: "sellPrice",
};

const mapPlanToText = (plan) => {
  switch (plan) {
    case plans.MONTHLY:
      return "1 Month Plan";
    case plans.QUATERLY:
      return "3 Months Plan";
    case plans.SEMIANNUAL:
      return "6 Month Plan";
    case plans.NINEMONTHS:
      return "9 Month Plan";
    case plans.ANNUAL:
      return "12 Month Plan";
    case plans.SELL:
      return "Sell";
    default:
      return "custom plan";
  }
};

const paymentModes = {
  CASHFREE: "CASHFREE",
  COD: "COD",
};
const paymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
};

const planDuration = {
  MONTHLY: 1 * 30 * 24 * 60 * 60 * 1000,
  QUATERLY: 3 * 30 * 24 * 60 * 60 * 1000,
  SEMIANNUAL: 6 * 30 * 24 * 60 * 60 * 1000,
  NINEMONTHS: 9 * 30 * 24 * 60 * 60 * 1000,
  ANNUAL: 12 * 30 * 24 * 60 * 60 * 1000,
};

const returnStates = {
  NOT_RETURNED: 0,
  RETURN_REQUESTED: 1,
  RETURNED: 2,
  NOT_ELIGIBLE: -1,
};

module.exports = {
  plans,
  paymentModes,
  paymentStatus,
  planDuration,
  returnStates,
  mapPlanToText,
};
