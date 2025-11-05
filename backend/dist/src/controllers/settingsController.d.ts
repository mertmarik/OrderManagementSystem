import { Request, Response } from 'express';
export declare const settingsController: {
    getAllSettings: (req: Request, res: Response) => Promise<void>;
    getSettingsSection: (req: Request, res: Response) => Promise<void>;
    updateSettingsSection: (req: Request, res: Response) => Promise<void>;
    getUserSessions: (req: Request, res: Response) => Promise<void>;
    revokeSession: (req: Request, res: Response) => Promise<void>;
    getBillingHistory: (req: Request, res: Response) => Promise<void>;
    updatePassword: (req: Request, res: Response) => Promise<void>;
    toggleTwoFactor: (req: Request, res: Response) => Promise<void>;
    connectIntegration: (req: Request, res: Response) => Promise<void>;
    disconnectIntegration: (req: Request, res: Response) => Promise<void>;
    exportSettings: (req: Request, res: Response) => Promise<void>;
    importSettings: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=settingsController.d.ts.map