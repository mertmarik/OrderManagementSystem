"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_1 = require("../controllers/settingsController");
const router = (0, express_1.Router)();
router.get('/', settingsController_1.settingsController.getAllSettings);
router.get('/:section', settingsController_1.settingsController.getSettingsSection);
router.put('/:section', settingsController_1.settingsController.updateSettingsSection);
router.get('/sessions/list', settingsController_1.settingsController.getUserSessions);
router.delete('/sessions/:sessionId', settingsController_1.settingsController.revokeSession);
router.get('/billing/history', settingsController_1.settingsController.getBillingHistory);
router.put('/security/password', settingsController_1.settingsController.updatePassword);
router.put('/security/two-factor', settingsController_1.settingsController.toggleTwoFactor);
router.post('/integrations/:integrationId/connect', settingsController_1.settingsController.connectIntegration);
router.delete('/integrations/:integrationId/disconnect', settingsController_1.settingsController.disconnectIntegration);
router.get('/export/all', settingsController_1.settingsController.exportSettings);
router.post('/import/all', settingsController_1.settingsController.importSettings);
exports.default = router;
//# sourceMappingURL=settings.js.map