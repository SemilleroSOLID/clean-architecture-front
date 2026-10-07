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

let requirementTypesRequest = null;

// The requirement catalog does not change while the app is open, so it is requested once.
export const getTypeRequirement = () => {
  requirementTypesRequest ??= axios
    .get(getEndpoint(requirementConfig, "getAllRequirements"))
    .then(({ data: customResponse }) => {
      if (customResponse.codeState == 200) return customResponse.data;
      throw new Error(
        `An Error occours trying fetch the data ${customResponse.message}`
      );
    })
    .catch((error) => {
      requirementTypesRequest = null;
      throw error;
    });
  return requirementTypesRequest;
};
