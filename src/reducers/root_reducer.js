import userReducer from './user_reducer'
import gamesReducer from './games_reducer'
import tokenReducer from './token_reducer'
import pageStatusReducer from './page_status_reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    games: gamesReducer,
    pageStatus: pageStatusReducer
})

export default rootReducer