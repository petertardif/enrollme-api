"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courserequests_typeDefs_1 = __importDefault(require("./courserequests/courserequests.typeDefs"));
const courses_typeDefs_1 = __importDefault(require("./courses/courses.typeDefs"));
const highschools_typeDefs_1 = __importDefault(require("./highschools/highschools.typeDefs"));
const higheredInstitutions_typeDefs_1 = __importDefault(require("./higherEdInstitutions/higheredInstitutions.typeDefs"));
const users_typeDefs_1 = __importDefault(require("./users/users.typeDefs"));
const typeDefs = [
    courserequests_typeDefs_1.default,
    courses_typeDefs_1.default,
    highschools_typeDefs_1.default,
    higheredInstitutions_typeDefs_1.default,
    users_typeDefs_1.default,
];
exports.default = typeDefs;
