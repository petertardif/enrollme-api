"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_utils_1 = require("./auth.utils");
const db_1 = __importDefault(require("../db"));
const authRouter = express_1.default.Router();
const jsonBodyParser = express_1.default.json();
authRouter.post('/login', jsonBodyParser, (req, res, next) => {
    const { email, password } = req.body;
    const loginUser = { email, password };
    for (const [key, value] of Object.entries(loginUser))
        if (value == null)
            return res.status(400).json({
                error: `Missing '${key}' in request body`,
            });
    auth_utils_1.getUserWithEmail(db_1.default, loginUser.email)
        .then((dbUser) => {
        if (!dbUser)
            return res.status(400).json({
                error: 'Incorrect username or password',
            });
        return auth_utils_1.comparePasswords(loginUser.password, dbUser.password).then((compareMatch) => {
            if (!compareMatch)
                return res.status(400).json({
                    error: 'Incorrect username or password',
                });
            const sub = dbUser.email;
            const payload = { id: dbUser.id };
            res.send({
                authToken: auth_utils_1.createJwt(sub, payload),
                id: dbUser.id,
                last_name: dbUser.last_name,
                first_name: dbUser.first_name,
                email: dbUser.email,
                role: dbUser.role,
                school_id: dbUser.school_id,
                higheredinstitution_id: dbUser.higheredinstitution_id,
            });
        });
    })
        .catch(next);
});
exports.default = authRouter;
