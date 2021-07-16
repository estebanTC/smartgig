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
const query = {
    Query: {
        messagesByUser: (__, userId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const mensajes = yield data_store_1.db.mensajes.find(userId);
                if (mensajes.length > 0) {
                    return mensajes;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.log(error);
            }
        }),
        random: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const totalMensajes = yield data_store_1.db.mensajes.find();
                const max = totalMensajes.length;
                const numero = Math.floor((Math.random() * (max + 1 - 1)) + 1);
                const mensaje = yield data_store_1.db.mensajes.findOne({ numero: numero });
                return mensaje;
            }
            catch (error) {
                console.log(error);
            }
        })
    }
};
exports.default = query;
