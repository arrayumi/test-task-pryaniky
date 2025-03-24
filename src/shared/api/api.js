import axios from "axios";

const BASE_URL = "https://test.v5.pryaniky.com";

const makeRequest = (url, method, data) => {
  const token = localStorage.getItem("access");
  return axios({
    url: BASE_URL + url,
    method: method,
    data: data,
    headers: token ? { Authorization: `Bearer ${token}` } : null,
  });
};

export const login = (data) =>
  makeRequest("/ru/data/v3/testmethods/docs/login/", "POST", {
    username: data.username,
    password: data.password,
  });
