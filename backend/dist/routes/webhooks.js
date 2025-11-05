"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.webhookRoutes = router;
router.post('/', (req, res) => res.json({ message: 'Webhooks endpoint' }));
//# sourceMappingURL=webhooks.js.map