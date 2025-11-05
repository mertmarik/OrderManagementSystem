"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRoutes = void 0;
const express_1 = require("express");
const suppliers_1 = require("../controllers/suppliers");
const router = (0, express_1.Router)();
exports.supplierRoutes = router;
router.get("/", suppliers_1.getSuppliers);
router.get("/search", suppliers_1.searchSuppliers);
router.get("/stats", suppliers_1.getSupplierStats);
router.get("/categories", suppliers_1.getSupplierCategories);
router.get("/:id", suppliers_1.getSupplier);
router.get("/:id/orders", suppliers_1.getSupplierOrders);
router.post("/", suppliers_1.createSupplier);
router.put("/:id", suppliers_1.updateSupplier);
router.patch("/:id/status", suppliers_1.updateSupplierStatus);
router.patch("/:id/preferred", suppliers_1.updateSupplierPreferred);
router.delete("/:id", suppliers_1.deleteSupplier);
//# sourceMappingURL=suppliers.js.map