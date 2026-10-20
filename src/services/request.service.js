import axios from "axios";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { requestConfig } from "../config/request.api.config.js";
import { toRequestError } from "../utils/requestError.util.js";

// Returns the created request and the message of the api, which depends on the automatic verification (#14).
export const createRequest = async (request) => {
  try {
    const response = await axios.post(getEndpoint(requestConfig, "createRequest"), request);
    return { request: response.data.data, message: response.data.message };
  } catch (error) {
    throw toRequestError(error, "No se pudo enviar la solicitud");
  }
};

// Filters are optional: { convocationId, state }; an empty one is not sent.
export const getAllRequests = async (filters = {}) => {
  try {
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value != null && value !== ""));
    const response = await axios.get(getEndpoint(requestConfig, "getAllRequests"), { params });
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, "No se pudieron cargar las solicitudes");
  }
};

export const getRequestById = async (requestId) => {
  try {
    const response = await axios.get(`${getEndpoint(requestConfig, "getRequestById")}/${requestId}`);
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, "No se pudo cargar la solicitud");
  }
};
