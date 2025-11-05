import { Router, Request, Response } from "express";

const router = Router();

// Mock data - replace with actual database queries
const mockOrders = [
  {
    id: "ORD-001",
    orderNumber: "ORD-2024-001",
    customer: "Acme Corporation",
    status: "confirmed",
    type: "sales_order",
    totalAmount: 2450.0,
    currency: "USD",
    createdAt: "2024-01-15T10:30:00Z",
    dueDate: "2024-02-15T00:00:00Z",
    items: [{ productName: "Custom T-Shirts", quantity: 100, unitPrice: 24.5 }],
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-2024-002",
    customer: "Beta Industries",
    status: "in_production",
    type: "sales_order",
    totalAmount: 1280.0,
    currency: "USD",
    createdAt: "2024-01-14T14:20:00Z",
    dueDate: "2024-02-20T00:00:00Z",
    items: [
      { productName: "Business Cards", quantity: 5000, unitPrice: 0.25 },
      { productName: "Letterheads", quantity: 1000, unitPrice: 0.15 },
    ],
  },
];

// GET /api/orders - List all orders with filtering and pagination
router.get("/", (req: Request, res: Response) => {
  try {
    const { status, type, customer, page = 1, limit = 10 } = req.query;

    let filteredOrders = mockOrders;

    // Apply filters
    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }
    if (type) {
      filteredOrders = filteredOrders.filter((order) => order.type === type);
    }
    if (customer) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customer
          .toLowerCase()
          .includes((customer as string).toLowerCase())
      );
    }

    // Apply pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch orders" },
    });
  }
});

// POST /api/orders - Create a new order
router.post("/", (req: Request, res: Response): void => {
  try {
    const { customerId, type, items, dueDate, notes } = req.body;

    // Validate required fields
    if (
      !customerId ||
      !type ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      res.status(400).json({
        success: false,
        error: {
          message: "Missing required fields: customerId, type, and items",
        },
      });
      return;
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    );

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber,
      customerId,
      customer: "New Customer", // This would come from customer lookup
      status: "draft",
      type,
      totalAmount,
      currency: "USD",
      items,
      dueDate,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, save to database here
    mockOrders.push(newOrder);

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to create order" },
    });
  }
});

// GET /api/orders/:id - Get specific order details
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Mock detailed order data
    const orderDetails = {
      id: id,
      orderNumber: "ORD-2024-001",
      customer: {
        id: "1",
        name: "Acme Corporation",
        email: "orders@acme.com",
        phone: "+1 (555) 123-4567",
        type: "business",
        address: {
          street: "123 Business Street",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
      },
      status: "confirmed",
      type: "sales_order",
      totalAmount: 2450.0,
      currency: "USD",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T14:20:00Z",
      dueDate: "2024-02-15T00:00:00Z",
      notes:
        "Rush order - customer needs by end of month. Special packaging required.",
      items: [
        {
          id: "1",
          productId: "1",
          productName: "Custom T-Shirts",
          sku: "TS-001",
          quantity: 100,
          unitPrice: 24.5,
          totalPrice: 2450.0,
          specifications: {
            color: "Navy Blue",
            size: "Mixed (S, M, L, XL)",
            material: "100% Cotton",
            print: "Company Logo - Front Chest",
          },
        },
      ],
      timeline: [
        {
          id: "1",
          action: "Order Created",
          timestamp: "2024-01-15T10:30:00Z",
          user: "John Smith",
          details: "Order created by customer portal",
        },
        {
          id: "2",
          action: "Order Confirmed",
          timestamp: "2024-01-15T14:20:00Z",
          user: "Sarah Johnson",
          details: "Order reviewed and confirmed by sales team",
        },
      ],
    };

    res.json({
      success: true,
      data: orderDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch order details" },
    });
  }
});

// PUT /api/orders/:id - Update an order
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // In a real app, update the order in the database
    const updatedOrder = {
      id,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to update order" },
    });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        error: { message: "Status is required" },
      });
      return;
    }

    // In a real app, update status and add to timeline
    const timelineEntry = {
      id: Date.now().toString(),
      action: `Status changed to ${status}`,
      timestamp: new Date().toISOString(),
      user: "Current User", // Get from auth context
      details: notes || undefined,
    };

    res.json({
      success: true,
      data: {
        id,
        status,
        updatedAt: new Date().toISOString(),
        timelineEntry,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to update order status" },
    });
  }
});

// DELETE /api/orders/:id - Delete an order
router.delete("/:id", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;

    // In a real app, soft delete or remove from database
    const deletedIndex = mockOrders.findIndex((order) => order.id === id);

    if (deletedIndex === -1) {
      res.status(404).json({
        success: false,
        error: { message: "Order not found" },
      });
      return;
    }

    mockOrders.splice(deletedIndex, 1);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to delete order" },
    });
  }
});

// GET /api/orders/stats/summary - Get order statistics
router.get("/stats/summary", (req: Request, res: Response) => {
  try {
    const stats = {
      totalOrders: mockOrders.length,
      totalValue: mockOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      pendingOrders: mockOrders.filter((o) => o.status === "pending").length,
      inProduction: mockOrders.filter((o) => o.status === "in_production")
        .length,
      statusBreakdown: {
        draft: mockOrders.filter((o) => o.status === "draft").length,
        pending: mockOrders.filter((o) => o.status === "pending").length,
        confirmed: mockOrders.filter((o) => o.status === "confirmed").length,
        in_production: mockOrders.filter((o) => o.status === "in_production")
          .length,
        shipped: mockOrders.filter((o) => o.status === "shipped").length,
        delivered: mockOrders.filter((o) => o.status === "delivered").length,
      },
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: "Failed to fetch order statistics" },
    });
  }
});

export { router as orderRoutes };
