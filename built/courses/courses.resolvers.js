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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db = new pg_1.Pool();
const courseResolvers = {
    Query: {
        courses: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const arrOfCourses = yield db.query(``);
                return arrOfCourses.rows;
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e.stack);
            }
        }),
    },
};
exports.default = courseResolvers;