"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.reportRoutes = router;
const mockData = {
    orders: [
        {
            id: "ORD-001",
            customerId: "CUST-001",
            status: "completed",
            total: 1575.0,
            date: "2024-01-15",
            items: [{ productName: "Custom T-Shirts", quantity: 100, price: 15.0 }],
        },
        {
            id: "ORD-002",
            customerId: "CUST-002",
            status: "processing",
            total: 850.0,
            date: "2024-01-20",
            items: [{ productName: "Business Cards", quantity: 1000, price: 0.85 }],
        },
        {
            id: "ORD-003",
            customerId: "CUST-003",
            status: "completed",
            total: 2100.0,
            date: "2024-02-05",
            items: [{ productName: "Logo Design", quantity: 1, price: 500.0 }],
        },
        {
            id: "ORD-004",
            customerId: "CUST-001",
            status: "pending",
            total: 425.0,
            date: "2024-02-10",
            items: [{ productName: "Promotional Mugs", quantity: 50, price: 8.5 }],
        },
        {
            id: "ORD-005",
            customerId: "CUST-004",
            status: "cancelled",
            total: 1200.0,
            date: "2024-02-15",
            items: [{ productName: "Custom Packaging", quantity: 1, price: 1200.0 }],
        },
    ],
    customers: [
        {
            id: "CUST-001",
            name: "Acme Corporation",
            type: "business",
            createdAt: "2023-12-01",
            totalSpent: 2000.0,
        },
        {
            id: "CUST-002",
            name: "Beta Industries",
            type: "business",
            createdAt: "2024-01-10",
            totalSpent: 850.0,
        },
        {
            id: "CUST-003",
            name: "John Smith",
            type: "individual",
            createdAt: "2024-01-15",
            totalSpent: 2100.0,
        },
        {
            id: "CUST-004",
            name: "Gamma Solutions",
            type: "business",
            createdAt: "2024-02-01",
            totalSpent: 0.0,
        },
    ],
    invoices: [
        {
            id: "INV-001",
            customerId: "CUST-001",
            status: "paid",
            total: 1650.0,
            paidAmount: 1650.0,
            date: "2024-01-15",
        },
        {
            id: "INV-002",
            customerId: "CUST-002",
            status: "sent",
            total: 935.0,
            paidAmount: 0.0,
            date: "2024-01-20",
        },
        {
            id: "INV-003",
            customerId: "CUST-003",
            status: "overdue",
            total: 550.0,
            paidAmount: 0.0,
            date: "2023-12-20",
        },
        {
            id: "INV-004",
            customerId: "CUST-001",
            status: "draft",
            total: 440.0,
            paidAmount: 0.0,
            date: "2024-01-25",
        },
    ],
    products: [
        { name: "Custom T-Shirts", category: "Apparel", margin: 35.5 },
        { name: "Business Cards", category: "Print", margin: 42.1 },
        { name: "Logo Design", category: "Design", margin: 68.2 },
        { name: "Promotional Mugs", category: "Promotional", margin: 28.7 },
        { name: "Custom Packaging", category: "Packaging", margin: 45.3 },
    ],
};
const filterByDateRange = (data, dateField, startDate, endDate) => {
    if (!startDate && !endDate)
        return data;
    return data.filter((item) => {
        const itemDate = new Date(item[dateField]);
        const start = startDate ? new Date(startDate) : new Date("1900-01-01");
        const end = endDate ? new Date(endDate) : new Date("2100-12-31");
        return itemDate >= start && itemDate <= end;
    });
};
const calculateGrowth = (current, previous) => {
    if (previous === 0)
        return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
};
router.get("/summary", (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filteredOrders = filterByDateRange(mockData.orders, "date", startDate, endDate);
        const filteredInvoices = filterByDateRange(mockData.invoices, "date", startDate, endDate);
        const totalRevenue = filteredOrders
            .filter((order) => order.status === "completed")
            .reduce((sum, order) => sum + order.total, 0);
        const totalOrders = filteredOrders.length;
        const totalCustomers = mockData.customers.length;
        const totalInvoices = filteredInvoices.length;
        const previousRevenue = totalRevenue * 0.9;
        const previousOrders = Math.floor(totalOrders * 0.92);
        const previousCustomers = Math.floor(totalCustomers * 0.87);
        const previousInvoices = Math.floor(totalInvoices * 0.94);
        const summary = {
            totalRevenue,
            totalOrders,
            totalCustomers,
            totalInvoices,
            revenueGrowth: calculateGrowth(totalRevenue, previousRevenue),
            ordersGrowth: calculateGrowth(totalOrders, previousOrders),
            customersGrowth: calculateGrowth(totalCustomers, previousCustomers),
            invoicesGrowth: calculateGrowth(totalInvoices, previousInvoices),
        };
        res.json(summary);
    }
    catch (error) {
        console.error("Error generating summary report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/sales-trend", (req, res) => {
    try {
        const { startDate, endDate, period = "month" } = req.query;
        const salesTrend = [
            { period: "Jan 2024", revenue: 12500, orders: 15, date: "2024-01-01" },
            { period: "Feb 2024", revenue: 18750, orders: 22, date: "2024-02-01" },
            { period: "Mar 2024", revenue: 22100, orders: 18, date: "2024-03-01" },
            { period: "Apr 2024", revenue: 19800, orders: 20, date: "2024-04-01" },
            { period: "May 2024", revenue: 28500, orders: 25, date: "2024-05-01" },
            { period: "Jun 2024", revenue: 31200, orders: 28, date: "2024-06-01" },
            { period: "Jul 2024", revenue: 23900, orders: 19, date: "2024-07-01" },
        ];
        const filteredTrend = filterByDateRange(salesTrend, "date", startDate, endDate);
        res.json(filteredTrend);
    }
    catch (error) {
        console.error("Error generating sales trend report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/top-customers", (req, res) => {
    try {
        const { limit = "5" } = req.query;
        const customerRevenue = mockData.customers.map((customer) => {
            const customerOrders = mockData.orders.filter((order) => order.customerId === customer.id && order.status === "completed");
            const revenue = customerOrders.reduce((sum, order) => sum + order.total, 0);
            const orderCount = customerOrders.length;
            return {
                id: customer.id,
                name: customer.name,
                revenue,
                orders: orderCount,
            };
        });
        const topCustomers = customerRevenue
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, parseInt(limit));
        res.json(topCustomers);
    }
    catch (error) {
        console.error("Error generating top customers report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/orders-by-status", (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filteredOrders = filterByDateRange(mockData.orders, "date", startDate, endDate);
        const totalOrders = filteredOrders.length;
        const statusCounts = filteredOrders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});
        const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
            status,
            count: count,
            percentage: totalOrders > 0 ? (count / totalOrders) * 100 : 0,
        }));
        res.json(ordersByStatus);
    }
    catch (error) {
        console.error("Error generating orders by status report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/invoices-by-status", (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filteredInvoices = filterByDateRange(mockData.invoices, "date", startDate, endDate);
        const totalInvoices = filteredInvoices.length;
        const statusData = filteredInvoices.reduce((acc, invoice) => {
            if (!acc[invoice.status]) {
                acc[invoice.status] = { count: 0, amount: 0 };
            }
            acc[invoice.status].count += 1;
            acc[invoice.status].amount += invoice.total;
            return acc;
        }, {});
        const invoicesByStatus = Object.entries(statusData).map(([status, data]) => ({
            status,
            count: data.count,
            amount: data.amount,
            percentage: totalInvoices > 0
                ? (data.count /
                    totalInvoices) *
                    100
                : 0,
        }));
        res.json(invoicesByStatus);
    }
    catch (error) {
        console.error("Error generating invoices by status report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/product-performance", (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filteredOrders = filterByDateRange(mockData.orders, "date", startDate, endDate);
        const productPerformance = mockData.products.map((product) => {
            const productOrders = filteredOrders.filter((order) => order.items.some((item) => item.productName === product.name) &&
                order.status === "completed");
            const revenue = productOrders.reduce((sum, order) => {
                const productItems = order.items.filter((item) => item.productName === product.name);
                return (sum +
                    productItems.reduce((itemSum, item) => itemSum + item.quantity * item.price, 0));
            }, 0);
            const orderCount = productOrders.length;
            return {
                name: product.name,
                revenue,
                orders: orderCount,
                margin: product.margin,
                category: product.category,
            };
        });
        const sortedPerformance = productPerformance.sort((a, b) => b.revenue - a.revenue);
        res.json(sortedPerformance);
    }
    catch (error) {
        console.error("Error generating product performance report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/export", (req, res) => {
    try {
        const { format = "json", startDate, endDate } = req.query;
        const reportData = {
            generatedAt: new Date().toISOString(),
            dateRange: { startDate, endDate },
            summary: {
                totalRevenue: 156750.0,
                totalOrders: 89,
                totalCustomers: 34,
                totalInvoices: 67,
            },
            orders: filterByDateRange(mockData.orders, "date", startDate, endDate),
            customers: mockData.customers,
            invoices: filterByDateRange(mockData.invoices, "date", startDate, endDate),
        };
        if (format === "csv") {
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", 'attachment; filename="oms-report.csv"');
            res.send("CSV export not implemented in mock version");
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Content-Disposition", 'attachment; filename="oms-report.json"');
            res.json(reportData);
        }
    }
    catch (error) {
        console.error("Error exporting report:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/", (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filteredOrders = filterByDateRange(mockData.orders, "date", startDate, endDate);
        const filteredInvoices = filterByDateRange(mockData.invoices, "date", startDate, endDate);
        const totalRevenue = filteredOrders
            .filter((order) => order.status === "completed")
            .reduce((sum, order) => sum + order.total, 0);
        const reportsData = {
            summary: {
                totalRevenue,
                totalOrders: filteredOrders.length,
                totalCustomers: mockData.customers.length,
                totalInvoices: filteredInvoices.length,
                revenueGrowth: 12.5,
                ordersGrowth: 8.3,
                customersGrowth: 15.2,
                invoicesGrowth: 6.7,
            },
            salesByMonth: [
                { month: "Jan", revenue: 12500, orders: 15 },
                { month: "Feb", revenue: 18750, orders: 22 },
                { month: "Mar", revenue: 22100, orders: 18 },
                { month: "Apr", revenue: 19800, orders: 20 },
                { month: "May", revenue: 28500, orders: 25 },
                { month: "Jun", revenue: 31200, orders: 28 },
                { month: "Jul", revenue: 23900, orders: 19 },
            ],
            topCustomers: [
                {
                    id: "CUST-001",
                    name: "Acme Corporation",
                    revenue: 28500,
                    orders: 12,
                },
                { id: "CUST-002", name: "Beta Industries", revenue: 22100, orders: 8 },
                { id: "CUST-003", name: "Gamma Solutions", revenue: 18750, orders: 6 },
                {
                    id: "CUST-004",
                    name: "Delta Enterprises",
                    revenue: 15600,
                    orders: 9,
                },
                { id: "CUST-005", name: "Epsilon Corp", revenue: 12800, orders: 5 },
            ],
            ordersByStatus: [
                { status: "completed", count: 45, percentage: 50.6 },
                { status: "processing", count: 23, percentage: 25.8 },
                { status: "pending", count: 12, percentage: 13.5 },
                { status: "cancelled", count: 9, percentage: 10.1 },
            ],
            invoicesByStatus: [
                { status: "paid", count: 34, amount: 89500, percentage: 50.7 },
                { status: "sent", count: 18, amount: 42300, percentage: 26.9 },
                { status: "overdue", count: 9, amount: 18900, percentage: 13.4 },
                { status: "draft", count: 6, amount: 6050, percentage: 9.0 },
            ],
            productPerformance: [
                { name: "Custom T-Shirts", revenue: 45600, orders: 28, margin: 35.5 },
                { name: "Business Cards", revenue: 23400, orders: 45, margin: 42.1 },
                { name: "Logo Design", revenue: 18750, orders: 8, margin: 68.2 },
                { name: "Promotional Mugs", revenue: 15200, orders: 22, margin: 28.7 },
                { name: "Custom Packaging", revenue: 12800, orders: 6, margin: 45.3 },
            ],
        };
        res.json(reportsData);
    }
    catch (error) {
        console.error("Error generating reports:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//# sourceMappingURL=reports.js.map