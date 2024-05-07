import axios from "axios";
import { exampleApi } from "../constants/example.api.constant.js";
import { getEndpoint } from "../utils/getEndpoint.util.js";

export const getRamdonDog = async () => {
  const response = await axios.get(getEndpoint(exampleApi, "random"));
  if (response.status == 200) return response.data;
  throw new Error(`An Error occours trying fetch the data ${response.data}`);
};
