import { Router } from "express";
import { settingsController } from "../controllers/settingsController";

const router = Router();

// Settings routes
router.get("/", settingsController.getAllSettings);
router.get("/:section", settingsController.getSettingsSection);
router.put("/:section", settingsController.updateSettingsSection);

// User sessions
router.get("/sessions/list", settingsController.getUserSessions);
router.delete("/sessions/:sessionId", settingsController.revokeSession);

// Billing
router.get("/billing/history", settingsController.getBillingHistory);

// Security
router.put("/security/password", settingsController.updatePassword);
router.put("/security/two-factor", settingsController.toggleTwoFactor);

// Integrations
router.post(
  "/integrations/:integrationId/connect",
  settingsController.connectIntegration
);
router.delete(
  "/integrations/:integrationId/disconnect",
  settingsController.disconnectIntegration
);

// Import/Export
router.get("/export/all", settingsController.exportSettings);
router.post("/import/all", settingsController.importSettings);

export default router;
