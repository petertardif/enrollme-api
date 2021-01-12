"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_resolvers_1 = __importDefault(require("./courses/courses.resolvers"));
const resolvers = [courses_resolvers_1.default];
exports.default = resolvers;
