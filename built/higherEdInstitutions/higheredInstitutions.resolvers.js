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
const higherEdInstitutionsResolvers = {
    Query: {
        higherEdInstitutions: (context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM higheredinstitutions WHERE isDeleted = false AND isActive = true';
                const arrOfHigherEdInstitutions = yield db_1.default.query(statement);
                return arrOfHigherEdInstitutions.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        higherEdInstitution: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM higheredinstitutions WHERE id = $1';
                const values = [`${id}`];
                const foundHigherEdInstitution = yield db_1.default.query(statement, values);
                return foundHigherEdInstitution.rows[0];
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    Mutation: {
        createHigherEdInstitution: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'INSERT INTO higheredinstitutions (name, institution_type,short_name, cde_number, cde_name, isCE, isDE) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
                const values = [
                    xss_1.default(`${args.name}`),
                    args.institution_type,
                    xss_1.default(`${args.short_name}`),
                    args.cde_number,
                    xss_1.default(`${args.cde_name}`),
                    args.isCE,
                    args.isDE,
                ];
                const newHigherEdInstitution = yield db_1.default.query(statement, values);
                return newHigherEdInstitution.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        updateHigherEdInstitution: (obj, { higherEdInstitution }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE higheredinstitutions SET name = $1, institution_type = $2, short_name = $3, cde_number = $4, cde_name = $5, isCE = $6, isDE = $7, isDeleted = $8, isActive = $9, updatedAt = $10 WHERE id = $11 RETURNING *';
                const values = [
                    xss_1.default(`${higherEdInstitution.name}`),
                    higherEdInstitution.institution_type,
                    xss_1.default(`${higherEdInstitution.short_name}`),
                    higherEdInstitution.cde_number,
                    xss_1.default(`${higherEdInstitution.cde_name}`),
                    higherEdInstitution.isCE,
                    higherEdInstitution.isDE,
                    higherEdInstitution.isDeleted,
                    higherEdInstitution.isActive,
                    updatedDate,
                    higherEdInstitution.id,
                ];
                const newHigherEdInstitution = yield db_1.default.query(statement, values);
                return newHigherEdInstitution.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        deleteHigherEdInstitution: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE higheredinstitutions SET isDeleted = true, isActive = false, updatedAt = $1 WHERE id = $2 RETURNING *';
                const values = [updatedDate, id];
                const newHigherEdInstitution = yield db_1.default.query(statement, values);
                return newHigherEdInstitution.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        reactivateHigherEdInstitution: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE higheredinstitutions SET isDeleted = false, isActive = true, updatedAt = $1 WHERE id = $2 RETURNING *';
                const values = [updatedDate, id];
                const reactivatedHigherEdInstitution = yield db_1.default.query(statement, values);
                return reactivatedHigherEdInstitution.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
};
exports.default = higherEdInstitutionsResolvers;
