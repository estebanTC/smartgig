import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { gql, useMutation } from '@apollo/client';
import PaginaContext from '../context/PaginaContext';
import CMensajeNuevo from '../components/mensajes/CMensajeNuevo';
import CMensajesUsuarios from '../components/mensajes/CMensajesUsuario';


const MENSAJE = gql`
 mutation{
    random{
      id
      texto
      numero
    }
}
`;



const Principal = () => {
    const [randomMensaje] = useMutation(MENSAJE);
    const paginacontext = useContext(PaginaContext);
    const { setMensaje, mensaje, userID } = paginacontext;

    const random = async () => {
        const { data } = await randomMensaje();

        const { texto } = data.random;

        setMensaje(texto);

    }

    return (
        <>
            <Layout>
                <div className="flex justify-center mt-5 pt-10">
                <p className="border-2 border-blue-800 p-4">{mensaje}</p>
                </div>
                <div className="flex justify-center mt-5">
                <button className="bg-gray-400 text-white p-8" onClick={() => { random() }}>Mensaje Random</button>
                </div>
                <p className="flex justify-center mt-5  pt-10">Escribe Tu mensaje</p>
                <CMensajeNuevo />
                <p className="flex justify-center mt-5">Tus Mensajes:</p>
                <CMensajesUsuarios
                    key="Mensajes-User"
                    userID={userID}
                />
               
            </Layout>
        </>
    );

}



export default Principal;