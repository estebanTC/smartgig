import React, {useContext} from 'react';
import {useQuery, gql} from "@apollo/client";
import { useRouter} from 'next/router';
import PaginaContext from '../context/PaginaContext';


const Header = () => {
    const paginacontext = useContext(PaginaContext);
    const {userName,limpiar} = paginacontext;
    // proteger no acceder antes 
    const router = useRouter();
    
   
    const cerrarSesion = () => {
        limpiar();
        router.push('/');
    }

    return (
        <div className="flex justify-between mb-6">
             <p className="mr-2">Hi: {userName }</p>

             <button    onClick={() => cerrarSesion()}
                        type="button"
                        className = "bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
                Sign Out
             </button>
        </div>
       

    );
}


export default Header;





