import axios from "axios";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { convocationConfig } from "../config/convocation.api.config.js";

export const getConvocationTypes = async () => {
  const response = await axios.get(
    getEndpoint(convocationConfig, "getAllConvocationTypes")
  );
  const customResponse = response.data;
  if (customResponse.codeState == 200)
    throw new Error(
      `An Error occours trying fetch the data ${customResponse.message}`
    );
};

export const getConditionRequirement = async () => {
  const response = await axios.get(
    getEndpoint(convocationConfig, "getConditionRequirement")
  );
  const customResponse = response.data;
  if (customResponse.codeState == 200)
    throw new Error(
      `An Error occours trying fetch the data ${customResponse.message}`
    );
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

