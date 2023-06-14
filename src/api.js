// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function authorizePayment({ paymentMethodId }) {
  const endpoint = "/api/payment-authorization";
  const payload = { paymentMethodToken: paymentMethodId };

  try {
    const response = await api.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response);
    throw error.response;
  }
}

export async function capturePayment(sessionId) {
  const endpoint = "/api/payment-capture";
  const payload = { sessionId };

  try {
    const response = await api.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
