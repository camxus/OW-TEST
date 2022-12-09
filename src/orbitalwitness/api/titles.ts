import { axiosInstance } from "@src/utility/hooks/useAxiosInstance";
import { AxiosResponse } from "axios";

export const getTitleData = () => {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const api_response = await axiosInstance.get("/titledata/testdata.json");
      resolve(api_response);
    } catch (error) {
      reject(error);
    }
  });
};
