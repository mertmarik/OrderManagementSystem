import { Router } from "express";
const router = Router();
router.post("/", (req: any, res: any) =>
  res.json({ message: "Webhooks endpoint" })
);
export { router as webhookRoutes };
