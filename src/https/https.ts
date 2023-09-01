import { GetDetailCartType } from "@/types/Carts";
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
};

export default serviceApi;
