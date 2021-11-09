import { backendApi } from "../config";

export const adminApi = `${backendApi}admin`;

export const ordersApi = {
  getOrders: `${adminApi}/orders`,
  orderDetails: (id) => `${adminApi}/orders/${id}`,
  ModifyOrderStatus: (id) => `${adminApi}/orders/${id}/modifyOrderStatus`,
  resendPaymentLink: (id) => `${adminApi}/orders/${id}/resendPaymentLink`,
  modifyDeliveryDates: (id) => `${adminApi}/orders/${id}/modifyDeliveryDates`,
};

export const notFoundBooks = `${adminApi}/not-found-books`;

export const returnsApi = {
  getReturnRequests: `${adminApi}/returns/requested`,
  getProcessedReturnRequests: `${adminApi}/returns/processed`,
  getReturnDetails: (id) => `${adminApi}/returns/${id}`,
  returnPaymentDetails: (id) =>
    `${adminApi}/returns/${id}/returnPaymentDetails`,
};

export const booksApi = {
  martolexBooks: `${adminApi}/books/martolex`,
  bookDetails: (id) => `${adminApi}/books/${id}`,
  thirdParty: {
    approved: `${adminApi}/books/thirdParty/approved`,
    notApproved: `${adminApi}/books/thirdParty/notApproved`,
    pendingApproval: `${adminApi}/books/thirdParty/pendingApproval`,
    changeApprovalState: `${adminApi}/books/thirdParty/approval`,
  },
};

export const categoriesApi = {
  getCategories: `${adminApi}/category`,
  getSubCategories: (catId) => `${adminApi}/category/subCategories/${catId}`,
};

export const LeadsApi = {
  getLeads: `${adminApi}/newsletter/getAllSubscribers`,
};

export const reviewsApi = {
  getReviews: `${adminApi}/reviews/latest`,
  delete: `${adminApi}/reviews/delete`,
};

export const UsersApi = {
  getUsers: `${adminApi}/users`,
  cartStats: `${adminApi}/users/cartStats`,
  getUserCart: (id) => `${adminApi}/users/${id}/cart`,
};

export const collegeApi = `${adminApi}/colleges`;

export const ambassadorsApi = {
  getAmbassadors: `${adminApi}/ambassadors`,
  isValidCandidate: `${adminApi}/ambassadors/isValidCandidate`,
  createAmbassador: `${adminApi}/ambassadors/new`,
  deactivate: `${adminApi}/ambassadors/deactivate`,
  stats: (ambassadorId) => `${adminApi}/ambassadors/${ambassadorId}/stats`,
};

export const loginApi = `${backendApi}auth/adminSignIn`;
