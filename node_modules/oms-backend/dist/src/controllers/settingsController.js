"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsController = void 0;
const mockSettings = {
    account: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'Administrator',
        timezone: 'America/New_York',
        language: 'English (US)',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-11-05T10:30:00Z',
    },
    business: {
        id: '1',
        companyName: 'Acme Corporation',
        industry: 'Manufacturing',
        website: 'https://acmecorp.com',
        taxId: '12-3456789',
        address: {
            street: '123 Business St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        businessHours: {
            monday: { start: '09:00', end: '17:00', enabled: true },
            tuesday: { start: '09:00', end: '17:00', enabled: true },
            wednesday: { start: '09:00', end: '17:00', enabled: true },
            thursday: { start: '09:00', end: '17:00', enabled: true },
            friday: { start: '09:00', end: '17:00', enabled: true },
            saturday: { start: '10:00', end: '14:00', enabled: false },
            sunday: { start: '10:00', end: '14:00', enabled: false },
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-11-05T10:30:00Z',
    },
    notifications: {
        id: '1',
        email: {
            orderUpdates: true,
            invoiceReminders: true,
            paymentReceived: true,
            lowStock: false,
            systemUpdates: true,
            marketingEmails: false,
        },
        push: {
            orderUpdates: true,
            invoiceReminders: false,
            paymentReceived: true,
            lowStock: true,
        },
        sms: {
            orderUpdates: false,
            invoiceReminders: true,
            paymentReceived: false,
        },
        updatedAt: '2024-11-05T10:30:00Z',
    },
    billing: {
        id: '1',
        currentPlan: 'Professional',
        planPrice: 49.00,
        billingCycle: 'monthly',
        nextBilling: '2024-12-05',
        paymentMethod: {
            type: 'Credit Card',
            last4: '4242',
            brand: 'Visa',
            expiry: '12/26',
        },
        updatedAt: '2024-11-05T10:30:00Z',
    },
    security: {
        id: '1',
        twoFactorEnabled: true,
        lastPasswordChange: '2024-10-15',
        loginAttempts: 0,
        accountLocked: false,
        updatedAt: '2024-11-05T10:30:00Z',
    },
    integrations: {
        id: '1',
        connected: [
            { id: 'hubspot', name: 'HubSpot CRM', status: 'connected', lastSync: '2024-11-05T08:00:00Z', apiKey: 'hub_***' },
            { id: 'stripe', name: 'Stripe Payments', status: 'connected', lastSync: '2024-11-05T09:30:00Z', apiKey: 'sk_***' },
            { id: 'quickbooks', name: 'QuickBooks', status: 'connected', lastSync: '2024-11-04T16:45:00Z', apiKey: 'qb_***' },
        ],
        available: [
            { id: 'slack', name: 'Slack', description: 'Get notifications in your Slack workspace' },
            { id: 'mailchimp', name: 'MailChimp', description: 'Sync customer data for email marketing' },
            { id: 'zapier', name: 'Zapier', description: 'Connect with 3000+ apps and automate workflows' },
        ],
        updatedAt: '2024-11-05T10:30:00Z',
    },
    preferences: {
        id: '1',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12-hour',
        numberFormat: 'US',
        defaultTaxRate: 10,
        invoicePrefix: 'INV-',
        orderPrefix: 'ORD-',
        autoSaveInterval: 30,
        compactMode: false,
        darkMode: false,
        language: 'en-US',
        theme: 'light',
        updatedAt: '2024-11-05T10:30:00Z',
    },
};
const mockSessions = [
    {
        id: 1,
        userId: '1',
        device: 'MacBook Pro',
        location: 'New York, NY',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        lastActive: '2024-11-05T10:30:00Z',
        current: true,
        createdAt: '2024-11-05T08:00:00Z',
    },
    {
        id: 2,
        userId: '1',
        device: 'iPhone 15',
        location: 'New York, NY',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        lastActive: '2024-11-04T18:45:00Z',
        current: false,
        createdAt: '2024-11-04T18:00:00Z',
    },
    {
        id: 3,
        userId: '1',
        device: 'Chrome Browser',
        location: 'Boston, MA',
        ipAddress: '192.168.2.50',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        lastActive: '2024-11-03T14:20:00Z',
        current: false,
        createdAt: '2024-11-03T14:00:00Z',
    },
];
const mockBillingHistory = [
    {
        id: 'INV-2024-001',
        date: '2024-11-05',
        amount: 49.00,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        paymentMethod: 'Visa ****4242',
    },
    {
        id: 'INV-2024-002',
        date: '2024-10-05',
        amount: 49.00,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        paymentMethod: 'Visa ****4242',
    },
    {
        id: 'INV-2024-003',
        date: '2024-09-05',
        amount: 49.00,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        paymentMethod: 'Visa ****4242',
    },
];
exports.settingsController = {
    getAllSettings: async (req, res) => {
        try {
            res.json({
                success: true,
                data: mockSettings,
            });
        }
        catch (error) {
            console.error('Error fetching settings:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch settings',
            });
        }
    },
    getSettingsSection: async (req, res) => {
        try {
            const { section } = req.params;
            if (!mockSettings[section]) {
                res.status(404).json({
                    success: false,
                    message: 'Settings section not found',
                });
                return;
            }
            res.json({
                success: true,
                data: mockSettings[section],
            });
        }
        catch (error) {
            console.error('Error fetching settings section:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch settings section',
            });
        }
    },
    updateSettingsSection: async (req, res) => {
        try {
            const { section } = req.params;
            const updates = req.body;
            if (!mockSettings[section]) {
                res.status(404).json({
                    success: false,
                    message: 'Settings section not found',
                });
                return;
            }
            mockSettings[section] = {
                ...mockSettings[section],
                ...updates,
                updatedAt: new Date().toISOString(),
            };
            res.json({
                success: true,
                message: 'Settings updated successfully',
                data: mockSettings[section],
            });
        }
        catch (error) {
            console.error('Error updating settings:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update settings',
            });
        }
    },
    getUserSessions: async (req, res) => {
        try {
            res.json({
                success: true,
                data: mockSessions,
            });
        }
        catch (error) {
            console.error('Error fetching user sessions:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch user sessions',
            });
        }
    },
    revokeSession: async (req, res) => {
        try {
            const { sessionId } = req.params;
            const sessionIndex = mockSessions.findIndex(session => session.id === parseInt(sessionId));
            if (sessionIndex === -1) {
                res.status(404).json({
                    success: false,
                    message: 'Session not found',
                });
                return;
            }
            mockSessions.splice(sessionIndex, 1);
            res.json({
                success: true,
                message: 'Session revoked successfully',
            });
        }
        catch (error) {
            console.error('Error revoking session:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to revoke session',
            });
        }
    },
    getBillingHistory: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedHistory = mockBillingHistory.slice(startIndex, endIndex);
            res.json({
                success: true,
                data: paginatedHistory,
                pagination: {
                    page,
                    limit,
                    total: mockBillingHistory.length,
                    pages: Math.ceil(mockBillingHistory.length / limit),
                },
            });
        }
        catch (error) {
            console.error('Error fetching billing history:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch billing history',
            });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword) {
                res.status(400).json({
                    success: false,
                    message: 'Current password and new password are required',
                });
                return;
            }
            mockSettings.security.lastPasswordChange = new Date().toISOString();
            mockSettings.security.updatedAt = new Date().toISOString();
            res.json({
                success: true,
                message: 'Password updated successfully',
            });
        }
        catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update password',
            });
        }
    },
    toggleTwoFactor: async (req, res) => {
        try {
            const { enabled } = req.body;
            mockSettings.security.twoFactorEnabled = enabled;
            mockSettings.security.updatedAt = new Date().toISOString();
            res.json({
                success: true,
                message: `Two-factor authentication ${enabled ? 'enabled' : 'disabled'} successfully`,
                data: {
                    twoFactorEnabled: enabled,
                },
            });
        }
        catch (error) {
            console.error('Error toggling two-factor authentication:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update two-factor authentication',
            });
        }
    },
    connectIntegration: async (req, res) => {
        try {
            const { integrationId } = req.params;
            const { apiKey, settings: integrationSettings } = req.body;
            const availableIntegration = mockSettings.integrations.available.find(integration => integration.id === integrationId);
            if (!availableIntegration) {
                res.status(404).json({
                    success: false,
                    message: 'Integration not found',
                });
                return;
            }
            const connectedIntegration = {
                id: availableIntegration.id,
                name: availableIntegration.name,
                status: 'connected',
                lastSync: new Date().toISOString(),
                apiKey: apiKey ? `${apiKey.substring(0, 3)}***` : 'api_***',
                settings: integrationSettings || {},
            };
            mockSettings.integrations.connected.push(connectedIntegration);
            mockSettings.integrations.available = mockSettings.integrations.available.filter(integration => integration.id !== integrationId);
            mockSettings.integrations.updatedAt = new Date().toISOString();
            res.json({
                success: true,
                message: 'Integration connected successfully',
                data: connectedIntegration,
            });
        }
        catch (error) {
            console.error('Error connecting integration:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to connect integration',
            });
        }
    },
    disconnectIntegration: async (req, res) => {
        try {
            const { integrationId } = req.params;
            const connectedIntegration = mockSettings.integrations.connected.find(integration => integration.id === integrationId);
            if (!connectedIntegration) {
                res.status(404).json({
                    success: false,
                    message: 'Connected integration not found',
                });
                return;
            }
            const availableIntegration = {
                id: connectedIntegration.id,
                name: connectedIntegration.name,
                description: 'Configure and connect this integration',
            };
            mockSettings.integrations.available.push(availableIntegration);
            mockSettings.integrations.connected = mockSettings.integrations.connected.filter(integration => integration.id !== integrationId);
            mockSettings.integrations.updatedAt = new Date().toISOString();
            res.json({
                success: true,
                message: 'Integration disconnected successfully',
            });
        }
        catch (error) {
            console.error('Error disconnecting integration:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to disconnect integration',
            });
        }
    },
    exportSettings: async (req, res) => {
        try {
            const exportData = {
                ...mockSettings,
                exportedAt: new Date().toISOString(),
                version: '1.0',
            };
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', 'attachment; filename="oms-settings-export.json"');
            res.json(exportData);
        }
        catch (error) {
            console.error('Error exporting settings:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to export settings',
            });
        }
    },
    importSettings: async (req, res) => {
        try {
            const importData = req.body;
            if (!importData || typeof importData !== 'object') {
                res.status(400).json({
                    success: false,
                    message: 'Invalid import data format',
                });
                return;
            }
            const allowedSections = ['account', 'business', 'notifications', 'preferences'];
            let updatedSections = 0;
            allowedSections.forEach(section => {
                if (importData[section]) {
                    mockSettings[section] = {
                        ...mockSettings[section],
                        ...importData[section],
                        updatedAt: new Date().toISOString(),
                    };
                    updatedSections++;
                }
            });
            res.json({
                success: true,
                message: `Settings imported successfully. Updated ${updatedSections} sections.`,
                data: {
                    updatedSections,
                    importedAt: new Date().toISOString(),
                },
            });
        }
        catch (error) {
            console.error('Error importing settings:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to import settings',
            });
        }
    },
};
//# sourceMappingURL=settingsController.js.map