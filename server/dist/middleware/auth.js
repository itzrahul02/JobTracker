"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
const db_1 = require("../config/db");
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        const users = await (0, db_1.getCollection)('users');
        const user = await users.findOne({ id: decoded.id }, { projection: { password: 0 } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
