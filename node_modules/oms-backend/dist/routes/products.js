"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.productRoutes = router;
router.get('/', (req, res) => res.json({ message: 'Products endpoint' }));
//# sourceMappingURL=products.js.map