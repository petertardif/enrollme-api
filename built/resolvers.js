"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_resolvers_1 = __importDefault(require("./courses/courses.resolvers"));
const highschools_resolvers_1 = __importDefault(require("./highschools/highschools.resolvers"));
const higheredInstitutions_resolvers_1 = __importDefault(require("./higherEdInstitutions/higheredInstitutions.resolvers"));
const resolvers = [
    courses_resolvers_1.default,
    highschools_resolvers_1.default,
    higheredInstitutions_resolvers_1.default,
];
exports.default = resolvers;
