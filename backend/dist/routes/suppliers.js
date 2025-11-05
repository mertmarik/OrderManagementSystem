"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.supplierRoutes = router;
router.get('/', (req, res) => res.json({ message: 'Suppliers endpoint' }));
//# sourceMappingURL=suppliers.js.map