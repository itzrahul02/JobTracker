"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => bcryptjs_1.default.hash(password, 10);
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashed) => bcryptjs_1.default.compare(password, hashed);
exports.comparePassword = comparePassword;
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'supersecretjwtkey', { expiresIn: '7d' });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
};
exports.verifyToken = verifyToken;
