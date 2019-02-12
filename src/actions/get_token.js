import * as types from '../types'
import ApiManager from '../http_requests/api_manager'


export default function getToken(){
    const am = new ApiManager()
    return dispatch => {
        am.csrfToken().then(data => {
            if(!data.errors){
                dispatch({ type: types.GET_TOKEN, payload: data.csrfToken})
            }
        })
        
    }
}