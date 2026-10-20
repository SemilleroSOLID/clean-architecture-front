import axios from "axios";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { authConfig } from "../config/auth.api.config.js";
import { toRequestError } from "../utils/requestError.util.js";

// Returns the session: { token, expiresAt, email, name, role, studentId }.
export const login = async (email, password) => {
  try {
    const response = await axios.post(getEndpoint(authConfig, "login"), { email, password });
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, "No se pudo iniciar sesión");
  }
};
