import * as types from '../types'

export default function userReducer(state = {
    username: undefined,
    authenticated: false,
    gamesWon: 0,
    activeGames: 0,
    loading: false,
    errors: ""
},
action){

    switch(action.type){

        case types.FETCHING_AUTHENTICATE:
            return { ...state, loading: true, errors: "" }
        case types.AUTHENTICATE:
            const { username, authenticated, games_won, active_games } = action.payload
            return { 
                username, 
                authenticated, 
                gamesWon: games_won, 
                activeGames: active_games, 
                loading: false,
                errors: "" 
            }
        case types.FAILED_AUTHENTICATE:
            return { 
                username: undefined, 
                authenticated: false, 
                loading: false, 
                gamesWon: 0, 
                activeGames: 0, 
                errors: "Authentication failed" 
            }
        case types.LOGOUT:
            return { 
                username: undefined, 
                authenticated: false, 
                loading: false, 
                gamesWon: 0, 
                activeGames: 0, 
                errors: "" 
            }
        default:
            return state
    }
}