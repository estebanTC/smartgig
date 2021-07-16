import React from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';

const EDITAR = gql`
mutation modificar ($input :UpMessage ){
  UpDateMessage(input:$input){
    id
    texto
    userId
    numero
  }
}
`;

const CajaMensajes = ({ texto, id }) => {

    const [editarMensaje] = useMutation(EDITAR);

    const edit = async (input) => {
        
        try {

            const { data } = await editarMensaje({
                variables: {
                    input: input
                }

            });

        } catch (error) {
            console.log(error);
        }


        

    }
    const Modal_venta = async () => {

        const htmlForm = `<textarea id="editarM" name="Editar" rows="4" cols="30">${texto}</textarea>`;

        const { value: formValues } = await Swal.fire({
            title: "Editar",
            html: htmlForm,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    "texto": document.getElementById('editarM').value,
                    "id": id
                }

            }
        })

        if (formValues) {
            edit(formValues);
        }

    }

    return (

        <>
            <div className="border-2 border-blue-800">
                <p>{texto}</p>
                <div className=" flex justify-center mt-5">
                <button className="bg-blue-300 text-white p-2" onClick={() => { Modal_venta() }}>Editar</button>
                </div>
                
            </div>
        </>

    );


}



export default CajaMensajes;