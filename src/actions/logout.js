import { LOGOUT } from '../types'
import apiManager from '../http_requests/api_manager'

export default function logout(){
    return dispatch => {
        dispatch({ type: LOGOUT })
        apiManager.logout().then(data => {
            if(data.logout !== "success"){
                throw new Error("LOGOUT ERROR")
            }
        })
    }
}

