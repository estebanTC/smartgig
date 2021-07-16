import React, { useContext, forwardRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import CajaMensajes from './CajaMensajes';



const MENSAJES_USUARIOS = gql`
query ($input : ID){
  messagesByUser(userId: $input){
    id
    texto
    userId
    numero
  }
}
`;


const CMensajesUsuarios = ({ userID }) => {

  //consultar base de datos
  const { data, loading, error } = useQuery(MENSAJES_USUARIOS, {
    variables: { input: userID }
  });

  if (loading) return null



  return (
    <>


      <div className="p-5 grid  grid-rows-1 grid-cols-1 gap-4 mt-4 sm:grid-rows-2 sm:grid-cols-3">
        {data.messagesByUser.map(mensajes => (
          <CajaMensajes
            key={mensajes.id}
            texto={mensajes.texto}
            id={mensajes.id}
          />
        ))}
      </div>

    </>

  )
}


export default CMensajesUsuarios;