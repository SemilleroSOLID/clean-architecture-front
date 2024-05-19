import axios from "axios";
import { exampleApi, serverApi } from "../constants/example.api.constant.js";
import { getEndpoint, getEndpointServerApi } from "../utils/getEndpoint.util.js";

export const getRamdonDog = async () => {
  const response = await axios.get(getEndpoint(exampleApi, "random"));
  if (response.status == 200) return response.data;
  throw new Error(`An Error occours trying fetch the data ${response.data}`);
};

export const getConvocationTypes = async () => {
  const response = await axios.get(getEndpointServerApi(serverApi, "convocation", "getAllConvocationTypes"));
  const customResponse = response.data;
  if (customResponse.codeState == 200) return customResponse.data;
  throw new Error(`An Error occours trying fetch the data ${customResponse.message}`);
}