"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_typeDef_1 = __importDefault(require("./courses/courses.typeDef"));
const highschools_typeDefs_1 = __importDefault(require("./highschools/highschools.typeDefs"));
const higheredInstitutions_typeDefs_1 = __importDefault(require("./higherEdInstitutions/higheredInstitutions.typeDefs"));
const typeDefs = [
    courses_typeDef_1.default,
    highschools_typeDefs_1.default,
    higheredInstitutions_typeDefs_1.default,
];
exports.default = typeDefs;
