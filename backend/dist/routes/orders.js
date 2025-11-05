"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.orderRoutes = router;
router.get('/', (req, res) => res.json({ message: 'Orders endpoint' }));
//# sourceMappingURL=orders.js.map