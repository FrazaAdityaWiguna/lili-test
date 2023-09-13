import {
  GetDetailCartType,
  PayloadAddCart,
  PayloadSubmitType,
} from "@/types/Carts";
import axios from "axios";

const env = "http://localhost:9000";

export const HttpClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
  baseURL: env,
  timeout: 10000,
});

HttpClient.interceptors.request.use((request) => {
  return request;
});

HttpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

const serviceApi = {
  async getCarts() {
    return HttpClient.get(`${env}/carts`);
  },

  async getDetailCart(payload: GetDetailCartType) {
    return HttpClient.get(`${env}/carts/${payload.id}`);
  },

  async postAddCart(id: number, payload: PayloadAddCart) {
    return HttpClient.patch(`${env}/carts/${id}`, payload);
  },

  async postOrders(payload: PayloadSubmitType) {
    return HttpClient.post(`${env}/orders`, payload);
  },
};

export default serviceApi;
