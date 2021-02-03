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
exports.validatePassword = exports.verifyJwt = exports.createJwt = exports.comparePasswords = exports.getUserWithEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const getUserWithEmail = (db, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statement = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const foundUser = yield db.query(statement, values);
        return foundUser.rows[0];
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
const validatePassword = (password) => {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    if (password.length < 8) {
        return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
        return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
        return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
        return 'Password must contain 1 uppercase letter, 1 lowercase letter, a number and a special character';
    }
    return null;
};
exports.validatePassword = validatePassword;
