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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../db"));
const xss_1 = __importDefault(require("xss"));
const auth_utils_1 = require("../authorization/auth.utils");
const apollo_server_express_1 = require("apollo-server-express");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(password, 12);
});
const usersResolvers = {
    Query: {
        users: (context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM users WHERE isDeleted = false AND isActive = true';
                const arrOfUsers = yield db_1.default.query(statement);
                return arrOfUsers.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        user: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM users WHERE id = $1';
                const values = [id];
                const foundUser = yield db_1.default.query(statement, values);
                return foundUser.rows[0];
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    Mutation: {
        createUser: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // check if email already exists
                const emailStatement = 'SELECT email FROM users WHERE email = $1';
                const emailValue = [args.email];
                const emailCheck = yield db_1.default.query(emailStatement, emailValue);
                const foundEmail = emailCheck.rows;
                if (foundEmail[0])
                    throw new apollo_server_express_1.ApolloError(`User account with '${foundEmail[0].email}' already exists. Please use forgot password link or contact the administrator to reactivate your account.`);
                // validate password
                const passwordError = auth_utils_1.validatePassword(args.password);
                console.log(passwordError);
                // if there is a password error, throw a new Apollo error
                if (passwordError)
                    throw new apollo_server_express_1.ApolloError(`Password did not meet validation requirements. Please try again.`);
                // hash password
                const cleanedPass = xss_1.default(`${args.password}`);
                const hashedPass = yield hashPassword(cleanedPass);
                // make call to database to store password in database
                const statement = 'INSERT INTO users (last_name, first_name, email, password, role, school_id, higheredinstitution_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
                const values = [
                    xss_1.default(`${args.last_name}`),
                    xss_1.default(`${args.first_name}`),
                    xss_1.default(`${args.email}`),
                    hashedPass,
                    xss_1.default(`${args.role}`),
                    args.school_id,
                    args.higheredinstitution_id,
                ];
                const newUser = yield db_1.default.query(statement, values);
                return newUser.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        updateUser: (obj, { user }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cleanedPass = xss_1.default(`${user.password}`);
                const hashedPass = yield hashPassword(cleanedPass);
                const statement = 'UPDATE users SET last_name = $1, first_name = $2, email = $3, password = $4, role = $5, school_id = $6, higheredinstitution_id = $7 WHERE id = $8 RETURNING *';
                const values = [
                    xss_1.default(`${user.last_name}`),
                    xss_1.default(`${user.first_name}`),
                    xss_1.default(`${user.email}`),
                    hashedPass,
                    xss_1.default(`${user.role}`),
                    user.school_id,
                    user.higheredinstitution_id,
                    user.id,
                ];
                const updateUser = yield db_1.default.query(statement, values);
                return updateUser.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        deleteUser: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE users SET isDeleted = true, isActive = false WHERE id = $1 RETURNING *';
                const values = [args.id];
                const deleteUser = yield db_1.default.query(statement, values);
                return deleteUser.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        reactivateUser: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE users SET isDeleted = false, isActive = true WHERE id = $1 RETURNING *';
                const values = [args.id];
                const reactivatedUser = yield db_1.default.query(statement, values);
                return reactivatedUser.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    User: {
        highschools: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = `SELECT * FROM highschools WHERE id = $1`;
                const values = [`${obj.school_id}`];
                const schools = yield db_1.default.query(statement, values);
                return schools.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        higherEdInstitutions: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = `SELECT * FROM higheredinstitutions WHERE id = $1`;
                const values = [`${obj.higheredinstitution_id}`];
                const foundHigherEdInstitutions = yield db_1.default.query(statement, values);
                return foundHigherEdInstitutions.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
};
exports.default = usersResolvers;
