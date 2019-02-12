import * as types from '../types'

export default function userReducer(state = {
    username: undefined,
    authenticated: false,
    gamesWon: 0,
    activeGames: 0,
    loading: false
},
action){

    switch(action.type){

        case types.FETCHING_AUTHENTICATE:
            return { ...state, loading: true }
        case types.AUTHENTICATE:
            const { username, authenticated, games_won, active_games } = action.payload
            return { 
                username, 
                authenticated, 
                gamesWon: games_won, 
                activeGames: active_games, 
                loading: false 
            }
        case types.FAILED_AUTHENTICATE:
            return { username: undefined, authorized: false, loading: false, gamesWon: 0, activeGames: 0 }
        case types.LOGOUT:
            return { username: undefined, authorized: false, loading: false, gamesWon: 0, activeGames: 0 }
        default:
            return state
    }
}