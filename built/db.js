"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const winston_1 = __importDefault(require("winston"));
const db = new pg_1.Pool();
db.on('error', (err) => {
    winston_1.default.error('idle client error', err.message, err.stack);
});
exports.default = db;
