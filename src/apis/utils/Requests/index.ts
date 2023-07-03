import {requestModel} from "../models/requestModel";
import {requestMethod} from "../constants/constants";
import {axiosRequest} from "../config/axios/axiosRequest";
import {commanResponse} from "../models/commonResponse";

const commonResponse = (response:any) =>{
    const responseOBJ:commanResponse = new commanResponse();
    responseOBJ.Status = response?.status === 200 ;
    responseOBJ.Result = response?.data ? response?.data : undefined;
    responseOBJ.ResponseStatus = response.status;
    return responseOBJ;
}
const commonErrorResponse = (error:any)=>{
    const responseOBJ:commanResponse = new commanResponse();
    console.log('Error::>', error.message);
    if (error.response) {
        responseOBJ.Message = error.message;
        responseOBJ.ResponseStatus = error.response.status
        responseOBJ.Status = false
    } else if (error.request) {
        responseOBJ.Message = JSON.stringify(error.request);
        responseOBJ.Status = false
    } else {
        responseOBJ.Message = error.message
        responseOBJ.Status = false
    }
    return responseOBJ
}

const GET = async (url:string,params={}) => {
        const reqestObj:requestModel = new requestModel();
        try {
            const  token = JSON.parse(localStorage.getItem('token')||'undefined')
            reqestObj.method = requestMethod.GET;
            reqestObj.url = url;
            reqestObj.params =params
            reqestObj.headers.Authorization =  token != 'undefined' ? `Bearer ${token}`:``
            const response = await axiosRequest.request(reqestObj);
            if(response) return commonResponse(response)
        } catch (error) {
          return commonErrorResponse(error)
        }
}
const POST = async (url:string,body={},params={}) => {
    const reqestObj :requestModel = new requestModel();
    try {
        const  token = JSON.parse(localStorage.getItem('token')||'undefined')
        reqestObj.method = requestMethod.POST;
        reqestObj.url = url;
        reqestObj.data = body;
        reqestObj.params =params
        reqestObj.headers.Authorization =  token != 'undefined' ? `Bearer ${token}`:``
        const response = await axiosRequest.request(reqestObj);
        if(response) return commonResponse(response)
    } catch (error) {
        return commonErrorResponse(error)
    }
}
export { GET,POST }