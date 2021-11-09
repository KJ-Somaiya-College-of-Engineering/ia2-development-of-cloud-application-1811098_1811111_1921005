export const plans = {
  MONTHLY: "oneMonth",
  QUATERLY: "threeMonth",
  SEMIANNUAL: "sixMonth",
  NINEMONTHS: "nineMonth",
  ANNUAL: "twelveMonth",
  SELL: "sellPrice",
};

export const returnStateSetters = {
  NOT_RETURNED: 0,
  RETURN_REQUESTED: 1,
  RETURNED: 2,
  NOT_ELIGIBLE: -1,
};

export const paymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
};

export const orderStatus = {
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  INTRANSIT: "INTRANSIT",
  DELIVERED: "DELIVERED",
};

export const paymentMethods = { COD: "COD", CASHFREE: "CASHFREE" };

export const returnStates = {
  0: { message: "not returned", color: "dark" },
  1: { message: "Return Requested", color: "warning" },
  2: { message: "Returned", color: "success" },
  "-1": { message: "not eligible for returns", color: "danger" },
};
