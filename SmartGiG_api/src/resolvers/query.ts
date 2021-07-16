//NO MODIFICAR las querys sin antes buscar que campos estan afectando en el sistema 
// Importamos 
require('dotenv').config({path: 'variables.env'});
import { IResolvers } from "graphql-tools";
import {db} from "../models/data.store";

// 
// ------- Inicio de Querys ---------------


const query : IResolvers = {
    Query : {

        messagesByUser: async (__:void,userId) =>{
            try {
                //Buscamos en la coleccion de la base de datos 
                const mensajes = await db.mensajes.find(userId);

                if(mensajes.length > 0){
                    
                   return  mensajes;
                }
                else{
                    return [];
                }
            }
            catch (error) {
                console.log(error);            
            }
        }        

    }
}

export default query;