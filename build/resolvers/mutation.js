"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: 'variables.env' });
const data_store_1 = require("../models/data.store");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const crearToken = (usuario, secret, expiresIn) => {
    const { id, userName } = usuario;
    return jwt.sign({ id, userName }, secret, { expiresIn });
};
const mutation = {
    Mutation: {
        NewUser: (__, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            const { userName, Password } = user;
            const existeUsuario = yield data_store_1.db.usuarios.findOne({ userName });
            if (existeUsuario) {
                throw new Error('El Usuario ya esta registrado');
            }
            try {
                const salt = yield bcryptjs.genSalt(10);
                user.Password = yield bcryptjs.hash(Password, salt);
                const NuevoUsuario = new data_store_1.db.usuarios(user);
                NuevoUsuario.save();
                return NuevoUsuario;
            }
            catch (error) {
                console.log(error);
            }
        }),
        AuthenticateUser: (__, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { userName, Password } = input;
            const existeUsuario = yield data_store_1.db.usuarios.findOne({ userName });
            if (!existeUsuario) {
                throw new Error('El Usuario no existe');
            }
            const passwordCorrecto = yield bcryptjs.compare(Password, existeUsuario.Password);
            if (!passwordCorrecto) {
                throw new Error('El password es incorrecto');
            }
            return {
                token: crearToken(existeUsuario, process.env.SECRET, '72h')
            };
        }),
        UpDatePassword: (__, { password, userName }) => __awaiter(void 0, void 0, void 0, function* () {
            let existeUsuario = yield data_store_1.db.usuarios.findOne({ userName });
            if (!existeUsuario) {
                throw new Error('El Usuario no esta registrado');
            }
            try {
                const salt = yield bcryptjs.genSalt(10);
                const Passwordcrypty = yield bcryptjs.hash(password, salt);
                existeUsuario = data_store_1.db.usuarios.findOneAndUpdate({ userName: userName }, { Password: Passwordcrypty }, { new: true });
                return existeUsuario;
            }
            catch (error) {
                console.log(error);
            }
        }),
        NewMessage: (__, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const totalMensajes = yield data_store_1.db.mensajes.find();
                input.numero = totalMensajes.length + 1;
                const NuevoMensaje = new data_store_1.db.mensajes(input);
                NuevoMensaje.save();
                return "Successful";
            }
            catch (error) {
                console.log(error);
            }
        }),
        UpDateMessage: (__, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, texto } = input;
            try {
                const Mensaje = data_store_1.db.mensajes.findOneAndUpdate({ _id: id }, { texto: texto }, { new: true });
                return Mensaje;
            }
            catch (error) {
                console.log(error);
            }
        })
    }
};
exports.default = mutation;
