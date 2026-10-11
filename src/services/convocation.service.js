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

const toRequestError = (error, defaultMessage) => {
  const customResponse = error.response?.data;
  const requestError = new Error(customResponse?.message ?? defaultMessage);
  requestError.fieldErrors = customResponse?.data ?? {};
  return requestError;
};

export const createConvocation = async (convocation) => {
  try {
    const response = await axios.post(
      getEndpoint(convocationConfig, "createConvocation"),
      convocation
    );
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, "No se pudo guardar la convocatoria");
  }
};

export const updateConvocation = async (convocationId, convocation) => {
  try {
    const response = await axios.put(
      `${getEndpoint(convocationConfig, "updateConvocation")}/${convocationId}`,
      convocation
    );
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, "No se pudo actualizar la convocatoria");
  }
};

export const deleteConvocation = async (convocationId) => {
  try {
    await axios.delete(`${getEndpoint(convocationConfig, "deleteConvocation")}/${convocationId}`);
  } catch (error) {
    throw toRequestError(error, "No se pudo eliminar la convocatoria");
  }
};

const changeConvocationState = async (endpointKey, convocationId, body, defaultMessage) => {
  try {
    const response = await axios.put(`${getEndpoint(convocationConfig, endpointKey)}/${convocationId}`, body);
    return response.data.data;
  } catch (error) {
    throw toRequestError(error, defaultMessage);
  }
};

export const closeConvocation = (convocationId) =>
  changeConvocationState("closeConvocation", convocationId, undefined, "No se pudo cerrar la convocatoria");

export const reopenConvocation = (convocationId, endDate) =>
  changeConvocationState("reopenConvocation", convocationId, { endDate }, "No se pudo reabrir la convocatoria");

export const finishConvocation = (convocationId) =>
  changeConvocationState("finishConvocation", convocationId, undefined, "No se pudo finalizar la convocatoria");

export const cancelConvocation = (convocationId, reason) =>
  changeConvocationState("cancelConvocation", convocationId, { reason }, "No se pudo cancelar la convocatoria");
