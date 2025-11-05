"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.orderRoutes = router;
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
router.get("/", (req, res) => {
    try {
        const { status, type, customer, page = 1, limit = 10 } = req.query;
        let filteredOrders = mockOrders;
        if (status) {
            filteredOrders = filteredOrders.filter((order) => order.status === status);
        }
        if (type) {
            filteredOrders = filteredOrders.filter((order) => order.type === type);
        }
        if (customer) {
            filteredOrders = filteredOrders.filter((order) => order.customer
                .toLowerCase()
                .includes(customer.toLowerCase()));
        }
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to fetch orders" },
        });
    }
});
router.post("/", (req, res) => {
    try {
        const { customerId, type, items, dueDate, notes } = req.body;
        if (!customerId ||
            !type ||
            !items ||
            !Array.isArray(items) ||
            items.length === 0) {
            res.status(400).json({
                success: false,
                error: {
                    message: "Missing required fields: customerId, type, and items",
                },
            });
            return;
        }
        const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const orderNumber = `ORD-${Date.now()}`;
        const newOrder = {
            id: `ORD-${Date.now()}`,
            orderNumber,
            customerId,
            customer: "New Customer",
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
        mockOrders.push(newOrder);
        res.status(201).json({
            success: true,
            data: newOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to create order" },
        });
    }
});
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
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
            notes: "Rush order - customer needs by end of month. Special packaging required.",
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to fetch order details" },
        });
    }
});
router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedOrder = {
            id,
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        res.json({
            success: true,
            data: updatedOrder,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to update order" },
        });
    }
});
router.patch("/:id/status", (req, res) => {
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
        const timelineEntry = {
            id: Date.now().toString(),
            action: `Status changed to ${status}`,
            timestamp: new Date().toISOString(),
            user: "Current User",
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to update order status" },
        });
    }
});
router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to delete order" },
        });
    }
});
router.get("/stats/summary", (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Failed to fetch order statistics" },
        });
    }
});
//# sourceMappingURL=orders.js.map