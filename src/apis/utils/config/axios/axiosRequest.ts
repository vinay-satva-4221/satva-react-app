import {api} from "./axios";
import {requestInterface} from "../../interfaces";

export const axiosRequest = {
    request: async (requestModal: requestInterface) :Promise<any> => await api.request(requestModal),
};
