"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const usuarios = require('../models/users');
const mensajes = require('../models/message');
exports.db = { usuarios, mensajes };
