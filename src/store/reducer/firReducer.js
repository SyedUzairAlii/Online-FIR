import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    ALLFIR: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ALLFIR:
            return ({
                ...states,
                ALLFIR: action.payload
            })
        default:
            return states;
    }
}