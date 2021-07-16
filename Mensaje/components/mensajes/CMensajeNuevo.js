import React, { useState, useContext } from 'react';
import PaginaContext from '../../context/PaginaContext';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const MENSAJENUEVO = gql`
 mutation mensajeNuevo($input: MessageInput){
  NewMessage(input : $input )
}
`;


const CMensajeNuevo = () => {
    const [nuevomensaje] = useMutation(MENSAJENUEVO);
    const [mensaje, setMensaje] = useState();
    const ctx = useContext(PaginaContext);
    const { userID } = ctx;


    const enviar = async () => {

        if (mensaje === "") {
            Swal.fire('error!', 'Escribe un mensaje !!', 'error');
        } else {
            let input = {
                "userId": userID,
                "texto": mensaje,
                "numero": 0,
            };
            try {
                const { data } = await nuevomensaje({
                    variables: {
                        input: input
                    }

                });

                const { NewMessage } = data;

                if (NewMessage === "Successful") {
                    Swal.fire('success!', 'Escribiste un mensaje !!', 'success');
                    setMensaje("");
                }
            } catch (error) {
                console.log(error);
            }



        }

    }


    return (

        <>
            <div className=" flex justify-center mt-5">
            <textarea className="w-60 h-20" onChange={(event) => setMensaje(event.target.value)} />
            <button onClick={() => { enviar() }}>Escribir Mensaje</button>
            </div>
        </>

    );

}

export default CMensajeNuevo;