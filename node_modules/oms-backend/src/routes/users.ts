import { Router, Request, Response } from "express";

const router = Router();

// Mock user data
const mockUsers = [
  {
    id: "1",
    email: "john.smith@example.com",
    firstName: "John",
    lastName: "Smith",
    role: "SALES",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "sarah.johnson@example.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "MANAGER",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// GET /api/users - List all users
router.get("/", (req: Request, res: Response) => {
  try {
    const { role, isActive, page = 1, limit = 10 } = req.query;

    let filteredUsers = mockUsers;

    // Apply filters
    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }
    if (isActive !== undefined) {
      filteredUsers = filteredUsers.filter(
        (user) => user.isActive === (isActive === "true")
      );
    }

    // Apply pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch users" },
    });
  }
});

// GET /api/users/:id - Get specific user
router.get("/:id", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: { message: "User not found" },
      });
      return;
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch user" },
    });
  }
});

export { router as userRoutes };
