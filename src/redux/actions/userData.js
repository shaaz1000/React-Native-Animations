import ActionTypes from "../constant/index"

export const setUserData = (param) => {
    return {
        type : ActionTypes.SET_API_DATA,
        payload : param
    }
}