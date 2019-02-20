import * as types from '../types'

export default function gamesReducer(state = [], action){
    switch(action.type){
        case types.AUTHENTICATE:
            return action.payload.games
        case types.FAILED_AUTHENTICATE:
            return []
        case types.LOGOUT:
            return []
        case types.NEW_GAME:
            return [...state, action.payload]
        case types.LOADING_END_GAME_TURN:
            const gameToEndIndex = state.findIndex(gameData => parseInt(gameData.id) === parseInt(action.payload.gameId))
            const gameToEnd = { ...state[gameToEndIndex] }
            gameToEnd.numberOfTurns += 1
            console.log(gameToEnd)
            return [...state.slice(0, gameToEndIndex), gameToEnd, ...state.slice(gameToEndIndex + 1)]
        case types.END_GAME_TURN:
            const turnEndedIndex = state.findIndex(gameData => parseInt(gameData.id) === parseInt(action.payload.id))
            const gameTurnEnded = action.payload
            return [...state.slice(0, turnEndedIndex), gameTurnEnded, ...state.slice(turnEndedIndex + 1)]
        case types.LOADING_TANK_HIT:
            const gameIndex = state.findIndex(gameData => parseInt(gameData.id) === parseInt(action.payload.gameId))
            const gameLoading = { ...state[gameIndex]}
            gameLoading.numberOfTurns += 1
            if(gameLoading.singleScreen){
                if(parseInt(action.payload.username) === 1){
                    gameLoading.healthPlayerOne -= action.payload.damage
                }else if(parseInt(action.payload.username) === 2){
                    gameLoading.healthPlayerTwo -= action.payload.damage
                }else{
                    return state
                }
            }else{
                const health = gameLoading.healths.find(health => health.username === action.payload.username )
                health.value -= action.payload.damage
            }
            return [...state.slice(0, gameIndex), gameLoading, ...state.slice(gameIndex + 1)]
        case types.REGISTER_TANK_HIT:
            const updatedGameIndex = state.findIndex(gameData => parseInt(gameData.id) === parseInt(action.payload.id))
            const updatedGame = action.payload
            return [...state.slice(0, updatedGameIndex), updatedGame, ...state.slice(updatedGameIndex + 1)]
        default: 
            return state
    }
}