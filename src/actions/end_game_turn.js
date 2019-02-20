import * as types from '../types'
import apiManager from '../http_requests/api_manager'

export default function endTurn(gameId){
    return dispatch => {
        dispatch({ type: types.LOADING_END_GAME_TURN, payload: { gameId } })
        apiManager.endTankGameTurn({ gameId })
        .then(data => {
            dispatch({ type: types.END_GAME_TURN, payload: data })
        })
    }
}