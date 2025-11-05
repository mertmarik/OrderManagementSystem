"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.invoiceRoutes = router;
router.get('/', (req, res) => res.json({ message: 'Invoices endpoint' }));
//# sourceMappingURL=invoices.js.map