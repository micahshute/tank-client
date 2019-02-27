import { UPDATE_GAME } from '../types'
import apiManager from '../http_requests/api_manager'

export default function updateGame(gameId){
    return dispatch => {
        apiManager.fetchMyGame(gameId)
        .then(data => {
            dispatch({ type: UPDATE_GAME, payload: data })
        })
    }
}