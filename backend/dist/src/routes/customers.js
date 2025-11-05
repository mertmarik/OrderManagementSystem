"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const router = (0, express_1.Router)();
exports.customerRoutes = router;
router.get("/", customers_1.getCustomers);
router.get("/search", customers_1.searchCustomers);
router.get("/stats", customers_1.getCustomerStats);
router.get("/:id", customers_1.getCustomer);
router.get("/:id/orders", customers_1.getCustomerOrders);
router.post("/", customers_1.createCustomer);
router.put("/:id", customers_1.updateCustomer);
router.patch("/:id/status", customers_1.updateCustomerStatus);
router.delete("/:id", customers_1.deleteCustomer);
//# sourceMappingURL=customers.js.map