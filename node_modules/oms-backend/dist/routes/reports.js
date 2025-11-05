"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.reportRoutes = router;
router.get('/', (req, res) => res.json({ message: 'Reports endpoint' }));
//# sourceMappingURL=reports.js.map