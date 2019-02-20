import { NEW_GAME, LOADING_NEW_GAME } from '../types'
import apiManager from '../http_requests/api_manager'

export default function newGame(gameType){
    return dispatch => {
        dispatch({ type: LOADING_NEW_GAME })
        apiManager.newTankGame(gameType).then(data => {
            dispatch({ type: NEW_GAME, payload: data })
        })
    }

}
