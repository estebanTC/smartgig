import React, {useState,useContext} from 'react';
import Layout from './Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from '@apollo/client';
import { useRouter} from 'next/router';
import PaginaContext from '../context/PaginaContext';



const AUTENTICAR_USUARIO =  gql `
mutation login($input:AutenticateUserInput!){
  AuthenticateUser(input: $input){
    userName
    id
  }
}
`;

const Login = () =>{

    const router = useRouter();
    const [mensaje, guardarmensaje] = useState(null);
    const paginacontext = useContext(PaginaContext);
    const {setuserName,setuserID} = paginacontext;
    
    //validar login 

    const [AuthenticateUser] = useMutation (AUTENTICAR_USUARIO);
    
    //valiar form 
    const formik = useFormik ({

        initialValues: {
            userName:'',
            Password:''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('The user name is required'),
            Password: Yup.string().required('The password is required')
        }),
        onSubmit: async valores => {
            const {userName,Password} = valores;
        
            try {
               
                const {data} = await AuthenticateUser ({
                    variables : {
                        input: {userName,Password}
                    }
                    
                }); 
                
                guardarmensaje('Validando..');

                //Guardar Datos
                const { id }= data.AuthenticateUser;
                localStorage.setItem('name', userName);
                localStorage.setItem('id', id);
                setuserName(userName);
                setuserID(id);
                
               
                setTimeout(()=>{
                    guardarmensaje(null);
                    router.push('/principal');
                    
                },3000);
     
            } catch (error) {
                console.log(error);
               
                guardarmensaje(error.message.replace('GraphQLerror: ', ''));
                

                setTimeout(()=>{
                    guardarmensaje(null);
                },3000);

            }

        }

    });

    const mostrarMensajes = () => {
        return (
            <div className = "bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                    <p>{mensaje}</p>
            </div>
        )
    }

    return (

        <>

            <Layout>
                    <div className="flex justify-center mt-5">
                        <img src="/Mensaje.jpeg" alt="Logo" className="h-40 w-auto" />
                    </div>

                    {mensaje && mostrarMensajes()}
                    
                    <div className="flex justify-center mt-5">

                        <div className="w-full max-w-sm">
                                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                       onSubmit={formik.handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Usuario">
                                            Usuario:
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                                    id="userName"
                                                    type="text"
                                                    placeholder = "User Name"
                                                    value={formik.values.userName}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    
                                            />
                                        </div>
                                        { formik.touched.Usuario && formik.errors.userName ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold">{formik.errors.Usuario}</p>
                                            </div>
                                        ) : null}

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
                                                Password:
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                                    id="Password"
                                                    type="password"
                                                    placeholder = "Your Password :)"
                                                    value={formik.values.Password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    
                                           />
                                        </div>
                                        { formik.touched.Password && formik.errors.Password ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold">{formik.errors.Password}</p>
                                            </div>
                                        ) : null}

                                        <input
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900"
                                            value="Log in"
                                        />
                                </form>
                        </div>

                    </div>

            </Layout>


        </>

    
     
    );

}



export default Login;