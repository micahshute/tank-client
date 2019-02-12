import userReducer from './user_reducer'
import gamesReducer from './games_reducer'
import tokenReducer from './token_reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    games: gamesReducer
})

export default rootReducer