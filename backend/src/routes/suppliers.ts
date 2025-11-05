import { Router } from "express";
import {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  updateSupplierStatus,
  updateSupplierPreferred,
  deleteSupplier,
  searchSuppliers,
  getSupplierOrders,
  getSupplierStats,
  getSupplierCategories,
} from "../controllers/suppliers";

const router = Router();

// Supplier routes
router.get("/", getSuppliers);
router.get("/search", searchSuppliers);
router.get("/stats", getSupplierStats);
router.get("/categories", getSupplierCategories);
router.get("/:id", getSupplier);
router.get("/:id/orders", getSupplierOrders);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.patch("/:id/status", updateSupplierStatus);
router.patch("/:id/preferred", updateSupplierPreferred);
router.delete("/:id", deleteSupplier);

export { router as supplierRoutes };
