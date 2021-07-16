require('dotenv').config({path: 'variables.env'});
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import expressPlayGround from 'graphql-playground-middleware-express';


const jwt = require ('jsonwebtoken');
const app = express();
app.use(cors());
app.use(compression());

// conectar a la DB 
const conectarDB = require('./config/db');

conectarDB();  

//////////////////////
  
const serveridor = new ApolloServer ({
    schema,
    introspection: true,
    context: ({req}) => {

        const token = req.headers['authorization'] || '';
        

        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
               
                return {
                    usuario
                }
                
            } catch (error) {
                console.log('hubo un error');
                console.log(error);
                
            }
        }
    }
});

serveridor.applyMiddleware({ app });
app.get('/', expressPlayGround({
    endpoint:'/graphql'
}));
const PORT =5200;

const httpServer = createServer(app);

httpServer.listen(
    {port :process.env.PORT || 5200},
    ()=> console.log(`http://localhost:${PORT}`)
);
