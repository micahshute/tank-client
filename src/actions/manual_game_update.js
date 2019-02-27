import { UPDATE_GAME } from '../types'

export default function manualGameUpdate(payload){

    return dispatch => dispatch({ type: UPDATE_GAME, payload })
}   