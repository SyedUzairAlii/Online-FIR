import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    profile_pic : false,
}

export default (states = INITIAL_STATE , action)=>{
    switch (action.type) { 
        case actionTypes.CHANGEUSERNAME:
            return ({
                ...states,
                profile_pic : action.payload
            }) 
        default:
            return states;
    }
}