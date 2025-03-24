import axios from "axios";

const BASE_URL = "https://test.v5.pryaniky.com";

const makeRequest = (url, method, data) => {
  const token = localStorage.getItem("access");
  return axios({
    url: BASE_URL + url,
    method: method,
    data: data,
    headers: token ? { "x-auth": token } : null,
  });
};

export const login = (data) => {
  return makeRequest("/ru/data/v3/testmethods/docs/login/", "POST", {
    username: data.username,
    password: data.password,
  });
};

export const getTableData = () => {
  return makeRequest("/ru/data/v3/testmethods/docs/userdocs/get/", "GET");
};

export const addTableRow = (data) => {
  return makeRequest(
    "/ru/data/v3/testmethods/docs/userdocs/create/",
    "POST",
    data
  );
};

export const deleteTableRow = (id) => {
  return makeRequest(
    `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    "POST"
  );
};

export const editTableRow = (data) => {
  return makeRequest(
    `/ru/data/v3/testmethods/docs/userdocs/set/${data.id}`,
    "POST",
    data
  );
};
