import React, { useReducer } from 'react';
import PaginaContext from './PaginaContext';
import PaginaReducer from './PaginaReducer';

import {

    USUARIO,
    USUARIOID,
    LIMPIAR,
    MENSAJE,

} from '../types'



const PaginaState = ({ children }) => {

    // State de nuevo almacen


    const initialState = {
        userName: "",
        userID: "",
        mensaje: ""
    }



    const [state, dispatch] = useReducer(PaginaReducer, initialState);
    //modificar typeLocation



    const setuserName = name => {

        dispatch({
            type: USUARIO,
            payload: name
        })
    }
    const setuserID = name => {

        dispatch({
            type: USUARIOID,
            payload: name
        })
    }

    const setMensaje = obj => {

        dispatch({
            type: MENSAJE,
            payload: obj
        })
    }

    const limpiar = () => {
        dispatch({
            type: LIMPIAR
        })
    }
    return (
        <PaginaContext.Provider
            value={{
                mensaje: state.mensaje,
                userName: state.userName,
                userID: state.userID,
                limpiar,
                setuserID,
                setuserName,
                setMensaje
            }}
        >


            {children}

        </PaginaContext.Provider>
    )
}

export default PaginaState;