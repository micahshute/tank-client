import * as types from '../types'
import apiManager from '../http_requests/api_manager';


export default function authenticateUser(){
    return dispatch => {
        dispatch( { type: types.FETCHING_AUTHENTICATE } )
        apiManager.authenticate().then(data => {
            if(data.authenticated){
                dispatch({ type: types.AUTHENTICATE, payload: data})
            }else{
                if(data.errors === "Invalid authenticity token"){
                    apiManager.csrfToken().then(data => {
                        if(!data.errors){
                            dispatch({ type: types.GET_TOKEN, payload: data.csrfToken})
                            apiManager.authenticate().then(data => {
                                if(data.authenticated){
                                    dispatch({ type: types.AUTHENTICATE, payload: data})
                                }else{
                                    dispatch({ type: types.FAILED_AUTHENTICATE })
                                }
                            })
                        }
                    })
                }
                dispatch({ type: types.FAILED_AUTHENTICATE })
            }
        })
     
    }
}