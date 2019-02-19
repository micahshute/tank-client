import * as types from '../types'

export default function gamesReducer(state = [], action){
    switch(action.type){
        case types.AUTHENTICATE:
            return action.payload.games
        case types.FAILED_AUTHENTICATE:
            return []
        case types.LOGOUT:
            return []
        default: 
            return state
    }
}