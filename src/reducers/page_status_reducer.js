import * as types from '../types'

const initState = {
    loading: false
}

export default function pageStatusReducer(state=initState, action){

    switch(action.type){

        case types.LOADING_NEW_GAME:
            return { ...state, loading: true }
        case types.NEW_GAME:
            return { ...state, loading: false }
        default:
            return state
    }
}