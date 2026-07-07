"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getUserById = exports.getUsers = void 0;
const db_1 = require("../config/db");
const auth_1 = require("../utils/auth");
const getUsers = async (_req, res) => {
    try {
        const users = await (0, db_1.getCollection)('users');
        const result = await users.find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const users = await (0, db_1.getCollection)('users');
        const user = await users.findOne({ id: req.params.id }, { projection: { password: 0 } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch user' });
    }
};
exports.getUserById = getUserById;
const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = await (0, db_1.getCollection)('users');
        const update = { updatedAt: new Date() };
        if (name)
            update.name = name;
        if (email)
            update.email = email;
        if (password)
            update.password = await (0, auth_1.hashPassword)(password);
        if (Object.keys(update).length === 1)
            return res.status(400).json({ message: 'No changes provided' });
        const result = await users.findOneAndUpdate({ id: req.user.id }, { $set: update }, { returnDocument: 'after', projection: { password: 0 } });
        return res.json(result.value);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to update profile' });
    }
};
exports.updateProfile = updateProfile;
