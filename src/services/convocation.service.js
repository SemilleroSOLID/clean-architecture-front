import axios from "axios";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { convocationConfig } from "../config/convocation.api.config.js";

export const getConvocationTypes = async () => {
  const response = await axios.get(
    getEndpoint(convocationConfig, "getAllConvocationTypes")
  );
  const customResponse = response.data;
  if (customResponse.codeState == 200) return customResponse.data;
  throw new Error(
    `An Error occours trying fetch the data ${customResponse.message}`
  );
};

export const getAllConvocations = async () => {
  const response = await axios.get(
    getEndpoint(convocationConfig, "getAllConvocations")
  );
  const customResponse = response.data;
  if (customResponse.codeState == 200) return customResponse.data;
  throw new Error(
    `An Error occours trying fetch the data ${customResponse.message}`
  );
};

export const getConvocationById = async (convocationId) => {
  try {
    const response = await axios.get(
      `${getEndpoint(convocationConfig, "getConvocationById")}/${convocationId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? "No se pudo cargar la convocatoria"
    );
  }
};

export const createConvocation = async (convocation) => {
  const response = await axios.post(
    getEndpoint(convocationConfig, "createConvocation"),
    convocation
  );
  const customResponse = response.data;
  if (customResponse.codeState != 200) throw new Error(
    `An Error occours trying fetch the data ${customResponse.message}`
  );
};

