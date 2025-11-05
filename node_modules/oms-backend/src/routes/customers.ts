import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  updateCustomerStatus,
  deleteCustomer,
  searchCustomers,
  getCustomerOrders,
  getCustomerStats,
} from "../controllers/customers";

const router = Router();

// Customer routes
router.get("/", getCustomers);
router.get("/search", searchCustomers);
router.get("/stats", getCustomerStats);
router.get("/:id", getCustomer);
router.get("/:id/orders", getCustomerOrders);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.patch("/:id/status", updateCustomerStatus);
router.delete("/:id", deleteCustomer);

export { router as customerRoutes };
