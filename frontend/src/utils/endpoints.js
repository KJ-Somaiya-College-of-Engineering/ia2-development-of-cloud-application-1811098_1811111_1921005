import { backendApi } from "../config";
import { get } from "./requests";

export const getCategorytreeApi = backendApi + "categories/tree";

export const loginApi = backendApi + "auth/signIn";

export const categorySearchApi = (catId) =>
  backendApi + `books/cat/${catId}?limit=12`;
export const subCategorySearchApi = (catId, subCatId, limit = 12) =>
  `${backendApi}books/cat/${catId}/subCat/${subCatId}?limit=${limit}`;
export const searchApi = (query) => `${backendApi}books/search${query}`;

export const productDetailsApi = (bookId) => `${backendApi}books/${bookId}`;

const userApi = `${backendApi}user`;
export const cartApi = `${userApi}/cart`;

export const bookReviewAPI = `${userApi}/books/review`;

export const updateCartQuantityApi = `${cartApi}/modifyQty`;

export const UserAddressesApi = `${userApi}/profile/addresses`;

export const ordersApi = {
  create: `${userApi}/order/create`,
  getDeliveryCharges: `${cartApi}/deliveryCharge`,
  orderDetails: (orderId) => `${userApi}/order/${orderId}`,
  getOrders: `${userApi}/order/`,
  retryPayment: `${userApi}/order/retryPayment`,
  getOrderAddress: `${userApi}/order/getDeliveryAddress`,
  returnItem: (itemId) => `${userApi}/order/return/${itemId}`,
  cancelReturn: (itemId) => `${userApi}/order/return/${itemId}/cancelRequest`,
  multipleOrderDetails: async (orderIds) => {
    var orders = [];
    if (typeof orderIds == "string") {
      orders = [orderIds];
    } else {
      orders = orderIds;
    }
    console.log(orders);

    const promises = orders.map((orderId) =>
      get(`${userApi}/order/${orderId}`)
    );
    const ordersDet = (await Promise.all(promises)).map((order) => order[0]);
    return ordersDet;
  },
};

const authApiRoot = backendApi + "auth";

export const authApi = {
  root: authApiRoot,
  login: `${authApiRoot}/signIn`,
  signUp: `${authApiRoot}/signUp`,
  googleLogin: `${authApiRoot}/googleSignIn`,
  forgotPassword: {
    sendRequest: `${authApiRoot}/forgot-password`,
    verifyRequest: `${authApiRoot}/forgot-password/verify-token`,
    resetPassword: `${authApiRoot}/forgot-password/reset-password`,
  },
};

export const UserBooksApi = `${userApi}/books/`;

export const bookUploadApi = {
  getBookNames: `${userApi}/books/getBookNames`,
  getBookDetails: (bookId) => `${userApi}/books/${bookId}`,
  uploadImage: `${userApi}/books/get_s3_signed_url`,
  upload: UserBooksApi,
};

export const userProfileApi = {
  userAddresses: `${userApi}/profile/addresses`,
  registerAsSeller: `${userApi}/profile/sellerRegister`,
};

export const notFoundBookApi = `${backendApi}not-found-books`;

export const getBankFromIFSC = (ifsc) => {
  return new Promise((resolve, reject) => {
    fetch(`https://ifsc.razorpay.com/${ifsc.toLowerCase()}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const SellerBooksApi = {
  getOrdersByBook: (bookId) => `${backendApi}seller/orders/book/${bookId}`,
};
export const subscribeToNewsLetter = `${backendApi}newsletter/subscribe`;
