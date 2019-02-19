import * as types from '../types'
import apiManager from '../http_requests/api_manager'


export default function getToken(){
    return dispatch => {
        apiManager.csrfToken().then(data => {
            if(!data.errors){
                dispatch({ type: types.GET_TOKEN, payload: data})
            }
        })
        
    }
}