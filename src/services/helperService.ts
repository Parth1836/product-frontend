import axios from "axios";
import CryptoJS from "crypto-js";
import { ProductAPIData } from "../types/product";
import { UserLogin, UserRegister } from "../types/user";

// generic func to check user's authentication status
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

// generic func to manipulating req and res
const serverApi = async (url: string, methodType: string, data: any = null) => {
  const token = localStorage.getItem("token");
  if (!token && !url?.includes("login") && !url?.includes("register")) {
    return null;
  }
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  let response = null;
  if (
    methodType === "POST" &&
    (url?.includes("login") || url?.includes("register"))
  ) {
    response = await axios.post(url, data);
  } else if (methodType === "POST") {
    response = await axios.post(url, data, options);
  } else if (methodType === "GET") {
    response = await axios.get(url, options);
  }
  if (response && response?.data) {
    return Promise.resolve(response.data);
  } else {
    console.log("error inside serverApi", response);
    return Promise.reject({
      error: true,
      msg: response,
    });
  }
};

//encrypting password
const encryptPasswordAES = (password: string) => {
  const secretKey = "PARTH_SECRETS"; // Store this securely!
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};

// method to call login api
export const loginApi = async (data: UserLogin) => {
  const encryptedPassword = encryptPasswordAES(data?.password);
  const loginPayload: UserLogin = {
    userEmail: data.userEmail,
    password: encryptedPassword,
  };

  const response = await serverApi(
    "http://localhost:8080/api/login",
    "POST",
    loginPayload
  );
  return response;
};

// method to call regiser api
export const registerApi = async (data: UserRegister) => {
  const encryptedPassword = encryptPasswordAES(data?.password);
  const registerPayload: UserRegister = {
    firstName: data.firstName,
    lastName: data.lastName,
    userEmail: data.userEmail,
    password: encryptedPassword,
  };
  const response = await serverApi(
    "http://localhost:8080/api/register",
    "POST",
    registerPayload
  );
  return response;
};

// method to call product list by pagination
export const getProductListByPage = async (
  page: number
): Promise<ProductAPIData> => {
  const response = await serverApi(
    `http://localhost:8080/api/get-product-list-by-page/${page}`,
    "GET"
  );
  return response;
};
