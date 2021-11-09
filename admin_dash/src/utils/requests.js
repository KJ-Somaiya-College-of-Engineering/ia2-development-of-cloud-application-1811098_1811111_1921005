import { store } from "../redux";
import querystring from "querystring";
// const store = {
//   getState: () => ({
//     user: {
//       token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MGI3YzRkLWZjZGItNDVkYi1iM2FhLTU4NDc2NTQ1N2ZjNiIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjAxMzc0MjEwfQ.mAfWUgDwTBAP2jzLcAqaAX-fAO_mA6BjiIPxwWewCLg`,
//     },
//   }),
// };
export const get = (api, isAuthorized = true, params = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    const allHeaders = {
      "Content-type": "application/json",
      ...headers,
    };
    if (isAuthorized) {
      allHeaders.Authorization = `bearer ${store.getState().user.token}`;
    }
    const query = querystring.stringify(params);
    const url = api + (query.length > 0 ? "?" + query : "");
    const options = {
      method: "GET",
      headers: allHeaders,
      credentials: "include",
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1) {
          resolve([res.data, res.pagination]);
        } else {
          reject(res.message);
        }
      })
      .catch((err) => reject(err));
  });
};

export const post = (api, isAuthorized = true, body = {}, headers = {}) => {
  const allHeaders = {
    "Content-type": "application/json",

    ...headers,
  };
  if (isAuthorized) {
    allHeaders.Authorization = `bearer ${store.getState().user.token}`;
  }
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: allHeaders,
      credentials: "include",
      body: JSON.stringify(body),
    };
    fetch(api, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1) {
          resolve([res.data, res.pagination]);
        } else {
          reject(res.message);
        }
      })
      .catch((err) => reject(err));
  });
};

export const deleteCall = (
  api,
  isAuthorized = true,
  body = {},
  headers = {}
) => {
  const allHeaders = {
    "Content-type": "application/json",

    ...headers,
  };
  if (isAuthorized) {
    allHeaders.Authorization = `bearer ${store.getState().user.token}`;
  }
  return new Promise((resolve, reject) => {
    const options = {
      method: "DELETE",
      headers: allHeaders,
      credentials: "include",
      body: JSON.stringify(body),
    };
    fetch(api, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1) {
          resolve([res.data, res.pagination]);
        } else {
          reject(res.message);
        }
      })
      .catch((err) => reject(err));
  });
};

export const put = (
  api,
  isAuthorized = true,
  type,
  body = {},
  headers = {}
) => {
  const allHeaders = {
    "Content-type": "application/json",

    ...headers,
  };
  if (isAuthorized) {
    allHeaders.Authorization = `bearer ${store.getState().user.token}`;
  }
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: allHeaders,
      credentials: "include",
      body: type !== "blob" ? JSON.stringify(body) : body,
    };
    fetch(api, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 1) {
          resolve([res.data, res.pagination]);
        } else {
          reject(res.message);
        }
      })
      .catch((err) => reject(err));
  });
};
