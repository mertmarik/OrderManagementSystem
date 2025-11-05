"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.customerRoutes = router;
router.get('/', (req, res) => res.json({ message: 'Customers endpoint' }));
//# sourceMappingURL=customers.js.map