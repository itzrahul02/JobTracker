"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../config/db");
const auth_1 = require("../utils/auth");
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const users = await (0, db_1.getCollection)('users');
        const existing = await users.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        const user = {
            id: (0, crypto_1.randomUUID)(),
            name,
            email,
            password: hashedPassword,
            role: role || 'CANDIDATE',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await users.insertOne(user);
        const token = (0, auth_1.signToken)({ id: user.id, role: user.role });
        return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to register user' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await (0, db_1.getCollection)('users');
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValid = await (0, auth_1.comparePassword)(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = (0, auth_1.signToken)({ id: user.id, role: user.role });
        return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to login' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    return res.json({ user: req.user });
};
exports.getMe = getMe;
