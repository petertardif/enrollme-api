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
const hashPassword = (password) => {
    return bcryptjs_1.default.hash(password, 12);
};
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
    Mutations: {
        createUser: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const hashedPass = hashPassword(xss_1.default(`${args.password}`));
                const statement = 'INSERT INTO users (last_name, first_name, email, password, role, school_id, higherEdInstitution_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
                const values = [
                    xss_1.default(`${args.last_name}`),
                    xss_1.default(`${args.first_name}`),
                    xss_1.default(`${args.email}`),
                    hashedPass,
                    xss_1.default(`${args.role}`),
                    args.school_id,
                    args.higherEdInstitution_id,
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
                const hashedPass = hashPassword(xss_1.default(`${user.password}`));
                const statement = 'UPDATE users SET last_name = $1, first_name = $2, email = $3, password = $4, role = $5, school_id = $6, higherEdInstitution_id = $7 RETURNING *';
                const values = [
                    xss_1.default(`${user.last_name}`),
                    xss_1.default(`${user.first_name}`),
                    xss_1.default(`${user.email}`),
                    hashedPass,
                    xss_1.default(`${user.role}`),
                    user.school_id,
                    user.higherEdInstitution_id,
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
    Users: {
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
                const values = [`${obj.higherEdInstitution_id}`];
                const foundHigherEdInstitutions = yield db_1.default.query(statement, values);
                return foundHigherEdInstitutions.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    HigherEdInstitutions: {},
};
exports.default = usersResolvers;
