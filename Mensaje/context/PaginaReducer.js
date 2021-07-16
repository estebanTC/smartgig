import {
    USUARIO,
    USUARIOID,
    LIMPIAR,
    MENSAJE,
} from '../types'


const reducer = (state, action) => {
    switch (action.type) {

        case USUARIO:
            return {
                ...state,
                userName: action.payload
            }
        case USUARIOID:
            return {
                ...state,
                userID: action.payload
            }
        case LIMPIAR:
            return {
                ...state,
                userID: "",
                userName: "",
            }

        case MENSAJE:
            return {
                ...state,
                mensaje: action.payload
            }



        default: return state
    }
}


export default reducer;