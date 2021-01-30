"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const auth_router_1 = __importDefault(require("./authorization/auth.router"));
const app = express_1.default();
dotenv_1.default.config();
// TODO: turn contentSecurityPolicy back on in production.
app.use(helmet_1.default({ contentSecurityPolicy: false }));
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.send('Hello Ms. World!');
});
app.use('/api/authentication', auth_router_1.default);
// TODO: set up error handling and logging with Winston
// app.use(function errorHandler(error: any, req: Request, res: Response) {
// 	let response;
// 	if (process.env.NODE_ENV === 'production') {
// 		response = { error: { message: 'server error' } };
// 	} else {
// 		// tslint:disable-next-line:no-console
// 		console.error(error);
// 		response = { message: error.message, error };
// 	}
// 	res.status(500).json(response);
// });
exports.default = app;
