export const returnStates = {
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
