import {commanResponse} from "../../utils/models/commonResponse";
import * as Yup from "yup";
import {ResponseStatus} from "../../utils/interfaces/enum";
import {POST} from "../../utils/Requests";
import {userAuthEndPoints} from "../../endpoints";
export const authHandler ={
    register
}
async function register (object: any) {
    try {
        let responseOBJ:commanResponse = new commanResponse();

        //schema for payload
        let registerSchema = Yup.object({
            name: Yup.string().required().min(3).max(30),
            email: Yup.string().email('Not a proper email').required(),
            password: Yup.string().required('password is require').matches(new RegExp("^[a-zA-Z0-9]{3,30}$")),
            repeat_password:Yup.ref('password')
        });

        if (await registerSchema.isValid(object)) {
            const response = await POST(userAuthEndPoints.REGISTER_USER,object);

            if (response) {
                responseOBJ.Status = response?.status === 200 ;
                responseOBJ.Result = response?.data ? response?.data : undefined;
                responseOBJ.ResponseStatus = response.status;
            }
        } else {
            responseOBJ.ResponseStatus = ResponseStatus.UnprocessableEntity;
            responseOBJ.Status = false;
            responseOBJ.Message = await registerSchema.validate(object).catch((e) => e.message);
        }
        console.log("vvacerrsdf")
        return responseOBJ;
    } catch (error) {
        console.log("error From controller::>", error);
    }
}