import axios from "axios";
import { getEndpoint } from "../utils/getEndpoint.util.js";
import { requirementConfig } from "../config/requirement.api.config.js";

export const getConditionRequirement = async () => {
  const response = await axios.get(
    getEndpoint(requirementConfig, "getAllConditionRequirements")
  );
  const customResponse = response.data;
  if (customResponse.codeState == 200) return customResponse.data;
  throw new Error(
    `An Error occours trying fetch the data ${customResponse.message}`
  );
};

export const getTypeRequirement = async () => {
  const response = await axios.get(
    getEndpoint(requirementConfig, "getAllRequirements")
  );
  const customResponse = response.data;
  if (customResponse.codeState == 200) return customResponse.data;
  throw new Error(
    `An Error occours trying fetch the data ${customResponse.message}`
  );
};
