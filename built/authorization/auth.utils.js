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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.createJwt = exports.comparePasswords = exports.getUserWithEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const getUserWithEmail = (db, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statement = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const foundUser = db.query(statement, values);
        return foundUser.rows;
    }
    catch (e) {
        console.log(e.stack);
    }
});
exports.getUserWithEmail = getUserWithEmail;
const comparePasswords = (password, hash) => {
    return bcryptjs_1.default.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
const createJwt = (subject, payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
        subject,
        algorithm: 'HS256',
    });
};
exports.createJwt = createJwt;
const verifyJwt = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, {
        algorithms: ['HS256'],
    });
};
exports.verifyJwt = verifyJwt;
