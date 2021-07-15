require('dotenv').config({path: 'variables.env'});
import { IResolvers } from "graphql-tools";
import _ from 'lodash';
import {db} from "../models/data.store";
const jwt = require ('jsonwebtoken');
const  bcryptjs = require ('bcryptjs');

const crearToken = (usuario : any, secret : any, expiresIn : any) =>{
    
    const {id,userName} = usuario;

    return jwt.sign({id,userName}, secret,{expiresIn});

}


const mutation : IResolvers = {
    Mutation: {
        
    NewUser : async (__:void, {user}) =>{
        const {userName, Password} = user;
        const existeUsuario = await db.usuarios.findOne({userName});

        if (existeUsuario){
            throw new Error ('El Usuario ya esta registrado');
        }
       
        
        try {
             // Hashear Password para seguridad 

            const salt = await bcryptjs.genSalt(10);
            user.Password = await bcryptjs.hash(Password , salt);
            // save in database
            const NuevoUsuario = new db.usuarios(user);
            NuevoUsuario.save();
            return NuevoUsuario;

        } catch (error) {
            console.log(error)
        }

    },
    AuthenticateUser : async (__:void, {input}) =>{
        const {userName , Password} = input;

        const existeUsuario = await db.usuarios.findOne({userName});

        if(!existeUsuario) {
            throw new Error('El Usuario no existe');
        }

        // Revisar Password
        const passwordCorrecto = await bcryptjs.compare(Password, existeUsuario.Password);

        if (!passwordCorrecto){
            throw new Error('El password es incorrecto');
        }
        // Crear el token

        return {
            token : crearToken(existeUsuario, process.env.SECRET, '72h')
        }

    },
    UpDatePassword: async (__:void, {password,userName}) =>{
        
        let existeUsuario = await db.usuarios.findOne({userName});
        
        if (!existeUsuario){
            throw new Error ('El Usuario no esta registrado');
        }       
        
        try {
             // Hashear Password

            const salt = await bcryptjs.genSalt(10);
            const Passwordcrypty = await bcryptjs.hash(password , salt);
          
            // save in database
             existeUsuario = db.usuarios.findOneAndUpdate({userName:userName}, {Password:Passwordcrypty}, {new : true } );
           
            return existeUsuario;
            
           

        } catch (error) {
            console.log(error)
        }

    },

    NewMessage: async (__:void, {input}) =>{
       
        try { 
            // Guardamos en la base de datos
            const totalMensajes = await db.mensajes.find(); 
            input.numero = totalMensajes.length + 1;
            const NuevoMensaje= new db.mensajes(input);
            NuevoMensaje.save();
            return "Successful";

        } catch (error) {
            console.log(error)
        }
    },
    UpDateMessage: async (__:void, {input}) =>{
       
        const {id,texto} = input;

        try {
            // save in database
          const Mensaje = db.mensajes.findOneAndUpdate({_id:id}, {texto:texto}, {new : true } );
           
            return Mensaje;
            
           

        } catch (error) {
            console.log(error)
        }

    }

    }
   
}

export default mutation;