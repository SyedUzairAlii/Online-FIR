import reducer from './reducer'
import { combineReducers } from 'redux'
import authReducer from './authReducer';
import firReducer from './firReducer'

export default combineReducers({
    rootReducer: reducer,
    authReducer: authReducer,
    firReducer: firReducer
})