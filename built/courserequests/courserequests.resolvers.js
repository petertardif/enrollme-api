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
const courserequestsResolvers = {
    Query: {
        courserequests: (context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM courserequests WHERE isDeleted = false AND isActive = true';
                const arrOfRequests = yield db_1.default.query(statement);
                return arrOfRequests.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        courserequest: (obj, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM courserequests WHERE id = $1';
                const values = [id];
                const foundRequest = yield db_1.default.query(statement, values);
                return foundRequest.rows[0];
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    Mutation: {
        createCourseRequest: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'INSERT INTO courserequests (school_id, course_id, course_type, instructor_type, instructor_id, school_year, academic_term, period, days, times, projected_enrollment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,10,$11) RETURNING *';
                const values = [
                    args.school_id,
                    args.course_id,
                    xss_1.default(`${args.course_type}`),
                    xss_1.default(`${args.instructor_type}`),
                    args.instructor_id,
                    xss_1.default(`${args.school_year}`),
                    xss_1.default(`${args.academic_term}`),
                    xss_1.default(`${args.period}`),
                    xss_1.default(`${args.days}`),
                    xss_1.default(`${args.times}`),
                    xss_1.default(`${args.projected_enrollment}`),
                ];
                const createdRequest = yield db_1.default.query(statement, values);
                return createdRequest.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        updateCourseRequest: (obj, { courserequest }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courserequests SET school_id = $1, course_id = $2, course_type = $3, instructor_type = $4, instructor_id = $5, school_year = $6, academic_term = $7 period = $8, days = $9, times = $10, projected_enrollment = $11 WHERE id = $12 RETURNING *';
                const values = [
                    courserequest.school_id,
                    courserequest.course_id,
                    xss_1.default(`${courserequest.course_type}`),
                    xss_1.default(`${courserequest.instructor_type}`),
                    courserequest.instructor_id,
                    xss_1.default(`${courserequest.school_year}`),
                    xss_1.default(`${courserequest.academic_term}`),
                    xss_1.default(`${courserequest.period}`),
                    xss_1.default(`${courserequest.days}`),
                    xss_1.default(`${courserequest.times}`),
                    xss_1.default(`${courserequest.projected_enrollment}`),
                    courserequest.id,
                ];
                const updatedCourseRequest = yield db_1.default.query(statement, values);
                return updatedCourseRequest.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        deleteCourseRequest: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courserequests SET isDeleted = true, isActive = false WHERE id = $1 RETURNING *';
                const values = [args.id];
                const deletedCourseRequest = yield db_1.default.query(statement, values);
                return deletedCourseRequest.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        archiveCourseRequest: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courserequests SET isDeleted = false, isActive = false WHERE id = $1 RETURNING *';
                const values = [args.id];
                const archivedCourseRequest = yield db_1.default.query(statement, values);
                return archivedCourseRequest.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        reactivateCourseRequest: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courserequests SET isDeleted = false, isActive = true WHERE id = $1 RETURNING *';
                const values = [args.id];
                const reactivatedCourseRequest = yield db_1.default.query(statement, values);
                return reactivatedCourseRequest.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        addCourseRequestToWishlist: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courserequests SET isDeleted = false, isActive = false, onWishlist = true WHERE id = $1 RETURNING *';
                const values = [args.id];
                const sentToWishList = yield db_1.default.query(statement, values);
                return sentToWishList.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
};
exports.default = courserequestsResolvers;
