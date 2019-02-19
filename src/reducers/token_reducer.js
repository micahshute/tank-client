import * as types from '../types'

export default function tokenReducer(state="", action){

    switch(action.type){
        case types.GET_TOKEN:
            return action.payload.csrfToken
        default:
            return state
    }
}