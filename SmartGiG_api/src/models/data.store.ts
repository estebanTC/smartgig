//Archivo para contener todos los modelos de la BD y poderlos usar en los resolvers 

const usuarios = require ('../models/users');
const mensajes = require ('../models/message');

export const db = {usuarios,mensajes}

