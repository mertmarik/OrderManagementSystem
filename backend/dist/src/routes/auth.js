"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post("/login", (req, res) => {
    res.json({ message: "Login endpoint - to be implemented" });
});
router.post("/register", (req, res) => {
    res.json({ message: "Register endpoint - to be implemented" });
});
router.post("/logout", (req, res) => {
    res.json({ message: "Logout endpoint - to be implemented" });
});
router.get("/me", (req, res) => {
    res.json({ message: "Get current user - to be implemented" });
});
//# sourceMappingURL=auth.js.map