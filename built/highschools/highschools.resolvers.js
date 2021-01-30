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
const db_1 = __importDefault(require("../db"));
const xss_1 = __importDefault(require("xss"));
const highSchoolsResolvers = {
    Query: {
        highSchools: (context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM highschools WHERE isActive = true and isDeleted = false';
                const arrOfHighSchools = yield db_1.default.query(statement);
                return arrOfHighSchools.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        highSchool: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM highschools WHERE id = $1';
                const values = [`${id}`];
                const foundHighSchool = yield db_1.default.query(statement, values);
                return foundHighSchool.rows[0];
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    Mutation: {
        createHighSchool: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'INSERT INTO highschools (school_num, school_name, network) VALUES ($1,$2,$3) RETURNING *';
                const values = [
                    args.school_num,
                    xss_1.default(`${args.school_name}`),
                    args.network,
                ];
                const newHighSchool = yield db_1.default.query(statement, values);
                return newHighSchool.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        updateHighSchool: (obj, { highSchool }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE highschools SET school_num = $1, school_name = $2, network = $3, isDeleted = $4, isActive = $5, updatedAt = $6 WHERE id = $7 RETURNING *';
                const values = [
                    highSchool.school_num,
                    xss_1.default(`${highSchool.school_name}`),
                    highSchool.network,
                    highSchool.isDeleted,
                    highSchool.isActive,
                    updatedDate,
                    highSchool.id,
                ];
                const updatedHighSchool = yield db_1.default.query(statement, values);
                return updatedHighSchool.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        deleteHighSchool: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE highschools SET isDeleted = true, isActive = false, updatedAt = $1 WHERE id = $2 RETURNING *';
                const values = [updatedDate, id];
                const deletedHighSchool = yield db_1.default.query(statement, values);
                return deletedHighSchool.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        reactivateHighSchool: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE highschools SET isDeleted = false, isActive = true, updatedAt = $1 WHERE id = $2 RETURNING *';
                const values = [updatedDate, id];
                const reactivatedHighSchool = yield db_1.default.query(statement, values);
                return reactivatedHighSchool.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
};
exports.default = highSchoolsResolvers;
