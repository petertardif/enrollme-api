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
const courseResolvers = {
    Query: {
        courses: (context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'SELECT * FROM courses WHERE isActive = true AND isDeleted = false';
                const arrOfCourses = yield db_1.default.query(statement);
                return arrOfCourses.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        course: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const foundCourse = yield db_1.default.query(`SELECT * FROM courses WHERE id = '${args.id}';`);
                return foundCourse.rows[0];
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
    Mutation: {
        createCourse: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'INSERT INTO courses (course_code,course_name,course_desc, course_level, college_credits, department, hs_credits, hs_department, culturally_relevant) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
                const values = [
                    `${args.course_code}`,
                    xss_1.default(`${args.course_name}`),
                    xss_1.default(`${args.course_desc}`),
                    xss_1.default(`${args.course_level}`),
                    `${args.college_credits}`,
                    xss_1.default(`${args.department}`),
                    `${args.hs_credits}`,
                    xss_1.default(`${args.hs_department}`),
                    `${args.culturally_relevant}`,
                ];
                const newCourse = yield db_1.default.query(statement, values);
                return newCourse.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        updateCourse: (obj, { course }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedDate = new Date().toISOString();
                const statement = 'UPDATE courses SET course_code = $1, course_name = $2, course_desc = $3, course_level = $4, college_credits = $5, department = $6, hs_credits = $7, hs_department = $8, culturally_relevant = $9, updatedAt = $10 WHERE id = $11 RETURNING *';
                const values = [
                    course.course_code,
                    xss_1.default(`${course.course_name}`),
                    xss_1.default(`${course.course_desc}`),
                    xss_1.default(`${course.course_level}`),
                    course.college_credits,
                    xss_1.default(`${course.department}`),
                    course.hs_credits,
                    xss_1.default(`${course.hs_department}`),
                    course.culturally_relevant,
                    updatedDate,
                    course.id,
                ];
                const updateCourse = yield db_1.default.query(statement, values);
                console.log(values);
                return updateCourse.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        deleteCourse: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courses SET isDeleted = true, isActive = false WHERE id = $1 RETURNING *';
                const values = [args.id];
                const deletedCourse = yield db_1.default.query(statement, values);
                return deletedCourse.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
        reactivateCourse: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const statement = 'UPDATE courses SET isDeleted = false, isActive = true WHERE id = $1 RETURNING *';
                const values = [args.id];
                const reactivatedCourse = yield db_1.default.query(statement, values);
                return reactivatedCourse.rows;
            }
            catch (e) {
                console.log(e.stack);
            }
        }),
    },
};
exports.default = courseResolvers;
