import apiManager from '../http_requests/api_manager'
import * as types from '../types'

export default function registerTankHit(username, gameId, damage = 1){

    return dispatch => {
        dispatch({ type: types.LOADING_TANK_HIT, payload: { gameId, username, damage }})
        apiManager.registerTankGameHit({ username, gameId, damage })
        .then(data => {
            dispatch({ type: types.REGISTER_TANK_HIT, payload: data})
        })
    }
}