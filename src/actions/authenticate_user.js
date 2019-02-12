import * as types from '../types'
import ApiManager from '../http_requests/api_manager';


export default function authenticateUser(){
    const am = new ApiManager()
    return dispatch => {
        dispatch( { type: types.FETCHING_AUTHORIZE } )
        am.authenticate().then(data => {
            if(data.authenticated){
                dispatch({ type: types.AUTHENTICATE, payload: data})
            }else{
                dispatch({ type: types.FAILED_AUTHENTICATE })
            }
        })
     
    }
}