
import {POST} from "../../utils/Requests";
import {userAuthEndPoints} from "../../endpoints";
export const authHandler ={
    register
}
async function register (object: any) {
    return await POST(userAuthEndPoints.REGISTER_USER,object);
}