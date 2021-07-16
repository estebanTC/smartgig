"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: 'variables.env' });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = __importDefault(require("./schema"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const jwt = require('jsonwebtoken');
const app = express_1.default();
app.use(cors_1.default());
app.use(compression_1.default());
const conectarDB = require('./config/db');
conectarDB();
const serveridor = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    introspection: true,
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
                return {
                    usuario
                };
            }
            catch (error) {
                console.log('hubo un error');
                console.log(error);
            }
        }
    }
});
serveridor.applyMiddleware({ app });
app.get('/', graphql_playground_middleware_express_1.default({
    endpoint: '/graphql'
}));
const PORT = 5200;
const httpServer = http_1.createServer(app);
httpServer.listen({ port: process.env.PORT || 5200 }, () => console.log(`http://localhost:${PORT}`));
