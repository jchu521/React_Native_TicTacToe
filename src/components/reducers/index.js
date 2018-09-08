import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import stepsReducer from './stepsReducer'
import miscReducer from './miscReducer'
import codePushReducer from './codePushReducer'
import userReducer from './userReducer'


const appReducer = combineReducers({
    game: gameReducer,
    steps: stepsReducer,
    misc: miscReducer,
    appInfo: codePushReducer,
    user: userReducer
})

//inital
//https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
export default (state, action) => {
    if(action.type === 'USER_LOGOUT'){
        state =undefined;
    }

    return appReducer(state, action)
}
