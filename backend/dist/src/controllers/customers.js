"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerStats = exports.getCustomerOrders = exports.searchCustomers = exports.deleteCustomer = exports.updateCustomerStatus = exports.updateCustomer = exports.createCustomer = exports.getCustomer = exports.getCustomers = void 0;
const customers = [
    {
        id: "CUST-001",
        name: "Acme Corporation",
        email: "orders@acme.com",
        phone: "+1 (555) 123-4567",
        type: "business",
        isActive: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:30:00Z",
        address: {
            street: "123 Business Street",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA",
        },
        creditLimit: 50000,
        paymentTerms: "Net 30",
        totalOrders: 24,
        totalSpent: 125400.5,
        lastOrderDate: "2024-01-20T14:30:00Z",
        taxId: "12-3456789",
        notes: "Preferred customer with excellent payment history.",
        contacts: [
            {
                id: "contact-1",
                name: "John Smith",
                title: "Purchasing Manager",
                email: "john@acme.com",
                phone: "+1 (555) 123-4567",
                isPrimary: true,
            },
        ],
    },
    {
        id: "CUST-002",
        name: "Beta Industries",
        email: "procurement@beta.com",
        phone: "+1 (555) 234-5678",
        type: "business",
        isActive: true,
        createdAt: "2024-01-10T09:15:00Z",
        updatedAt: "2024-01-18T11:45:00Z",
        address: {
            street: "456 Industrial Blvd",
            city: "Chicago",
            state: "IL",
            postalCode: "60601",
            country: "USA",
        },
        creditLimit: 25000,
        paymentTerms: "Net 15",
        totalOrders: 18,
        totalSpent: 87300.75,
        lastOrderDate: "2024-01-18T11:45:00Z",
        taxId: "98-7654321",
        notes: "Regular customer, prompt payment.",
        contacts: [],
    },
    {
        id: "CUST-003",
        name: "John Smith",
        email: "john@example.com",
        phone: "+1 (555) 345-6789",
        type: "individual",
        isActive: true,
        createdAt: "2024-01-08T16:20:00Z",
        updatedAt: "2024-01-22T13:15:00Z",
        address: {
            street: "789 Residential Ave",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90210",
            country: "USA",
        },
        creditLimit: 5000,
        paymentTerms: "Credit Card",
        totalOrders: 7,
        totalSpent: 3450.25,
        lastOrderDate: "2024-01-22T13:15:00Z",
        notes: "Individual customer, small but consistent orders.",
        contacts: [],
    },
    {
        id: "CUST-004",
        name: "Global Tech Solutions",
        email: "orders@globaltech.com",
        phone: "+1 (555) 456-7890",
        type: "business",
        isActive: false,
        createdAt: "2023-12-15T10:00:00Z",
        updatedAt: "2023-12-20T10:30:00Z",
        address: {
            street: "321 Tech Park",
            city: "San Francisco",
            state: "CA",
            postalCode: "94105",
            country: "USA",
        },
        creditLimit: 75000,
        paymentTerms: "Net 45",
        totalOrders: 45,
        totalSpent: 234500.0,
        lastOrderDate: "2023-12-20T10:30:00Z",
        taxId: "11-2233445",
        notes: "Inactive customer, payment issues.",
        contacts: [],
    },
];
const getCustomers = (req, res) => {
    try {
        const { page = "1", limit = "10", search, type, status, sortBy = "createdAt", sortOrder = "desc", } = req.query;
        let filteredCustomers = [...customers];
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredCustomers = filteredCustomers.filter((customer) => customer.name.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm) ||
                customer.phone?.toLowerCase().includes(searchTerm) ||
                customer.id.toLowerCase().includes(searchTerm));
        }
        if (type && type !== "all") {
            filteredCustomers = filteredCustomers.filter((customer) => customer.type === type);
        }
        if (status && status !== "all") {
            const isActive = status === "active";
            filteredCustomers = filteredCustomers.filter((customer) => customer.isActive === isActive);
        }
        filteredCustomers.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            if (sortBy === "createdAt" ||
                sortBy === "updatedAt" ||
                sortBy === "lastOrderDate") {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }
            if (sortOrder === "asc") {
                return aValue > bValue ? 1 : -1;
            }
            else {
                return aValue < bValue ? 1 : -1;
            }
        });
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
        res.json({
            customers: paginatedCustomers,
            totalCount: filteredCustomers.length,
            totalPages: Math.ceil(filteredCustomers.length / limitNum),
            currentPage: pageNum,
            hasNextPage: endIndex < filteredCustomers.length,
            hasPrevPage: pageNum > 1,
        });
    }
    catch (error) {
        console.error("Error getting customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCustomers = getCustomers;
const getCustomer = (req, res) => {
    try {
        const { id } = req.params;
        const customer = customers.find((c) => c.id === id);
        if (!customer) {
            res.status(404).json({ error: "Customer not found" });
            return;
        }
        res.json(customer);
    }
    catch (error) {
        console.error("Error getting customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCustomer = getCustomer;
const createCustomer = (req, res) => {
    try {
        const { name, email, phone, type, address, paymentTerms, creditLimit, taxId, notes, contacts, } = req.body;
        if (!name || !email || !type || !address) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const customerCount = customers.length;
        const newId = `CUST-${String(customerCount + 1).padStart(3, "0")}`;
        const newCustomer = {
            id: newId,
            name,
            email,
            phone: phone || "",
            type,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            address,
            creditLimit: parseFloat(creditLimit) || 0,
            paymentTerms: paymentTerms || "Net 30",
            totalOrders: 0,
            totalSpent: 0,
            lastOrderDate: new Date().toISOString(),
            taxId: taxId || "",
            notes: notes || "",
            contacts: contacts || [],
        };
        customers.push(newCustomer);
        res.status(201).json(newCustomer);
    }
    catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createCustomer = createCustomer;
const updateCustomer = (req, res) => {
    try {
        const { id } = req.params;
        const customerIndex = customers.findIndex((c) => c.id === id);
        if (customerIndex === -1) {
            res.status(404).json({ error: "Customer not found" });
            return;
        }
        const { name, email, phone, type, address, paymentTerms, creditLimit, taxId, notes, contacts, isActive, } = req.body;
        const updatedCustomer = {
            ...customers[customerIndex],
            name: name || customers[customerIndex].name,
            email: email || customers[customerIndex].email,
            phone: phone !== undefined ? phone : customers[customerIndex].phone,
            type: type || customers[customerIndex].type,
            address: address || customers[customerIndex].address,
            paymentTerms: paymentTerms || customers[customerIndex].paymentTerms,
            creditLimit: creditLimit !== undefined
                ? parseFloat(creditLimit)
                : customers[customerIndex].creditLimit,
            taxId: taxId !== undefined ? taxId : customers[customerIndex].taxId,
            notes: notes !== undefined ? notes : customers[customerIndex].notes,
            contacts: contacts || customers[customerIndex].contacts,
            isActive: isActive !== undefined ? isActive : customers[customerIndex].isActive,
            updatedAt: new Date().toISOString(),
        };
        customers[customerIndex] = updatedCustomer;
        res.json(updatedCustomer);
    }
    catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateCustomer = updateCustomer;
const updateCustomerStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        const customerIndex = customers.findIndex((c) => c.id === id);
        if (customerIndex === -1) {
            res.status(404).json({ error: "Customer not found" });
            return;
        }
        customers[customerIndex] = {
            ...customers[customerIndex],
            isActive,
            updatedAt: new Date().toISOString(),
        };
        res.json(customers[customerIndex]);
    }
    catch (error) {
        console.error("Error updating customer status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateCustomerStatus = updateCustomerStatus;
const deleteCustomer = (req, res) => {
    try {
        const { id } = req.params;
        const customerIndex = customers.findIndex((c) => c.id === id);
        if (customerIndex === -1) {
            res.status(404).json({ error: "Customer not found" });
            return;
        }
        const customer = customers[customerIndex];
        if (customer.totalOrders > 0) {
            res.status(400).json({
                error: "Cannot delete customer with existing orders. Deactivate instead.",
            });
            return;
        }
        const deletedCustomer = customers.splice(customerIndex, 1)[0];
        res.json({
            message: "Customer deleted successfully",
            customer: deletedCustomer,
        });
    }
    catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteCustomer = deleteCustomer;
const searchCustomers = (req, res) => {
    try {
        const { q, limit = "10" } = req.query;
        if (!q) {
            res.json([]);
            return;
        }
        const searchTerm = q.toLowerCase();
        const limitNum = parseInt(limit);
        const filteredCustomers = customers
            .filter((customer) => customer.isActive &&
            (customer.name.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm) ||
                customer.id.toLowerCase().includes(searchTerm)))
            .slice(0, limitNum)
            .map((customer) => ({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            type: customer.type,
        }));
        res.json(filteredCustomers);
    }
    catch (error) {
        console.error("Error searching customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.searchCustomers = searchCustomers;
const getCustomerOrders = (req, res) => {
    try {
        const { id } = req.params;
        const { page = "1", limit = "10" } = req.query;
        const customer = customers.find((c) => c.id === id);
        if (!customer) {
            res.status(404).json({ error: "Customer not found" });
            return;
        }
        const mockOrders = [
            {
                id: "ORD-001",
                orderNumber: "ORD-001",
                customerId: id,
                customerName: customer.name,
                date: "2024-01-20T14:30:00Z",
                status: "delivered",
                total: 1250.0,
                items: 3,
            },
            {
                id: "ORD-002",
                orderNumber: "ORD-002",
                customerId: id,
                customerName: customer.name,
                date: "2024-01-18T09:15:00Z",
                status: "delivered",
                total: 875.5,
                items: 2,
            },
        ];
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedOrders = mockOrders.slice(startIndex, endIndex);
        res.json({
            orders: paginatedOrders,
            totalCount: mockOrders.length,
            totalPages: Math.ceil(mockOrders.length / limitNum),
            currentPage: pageNum,
            hasNextPage: endIndex < mockOrders.length,
            hasPrevPage: pageNum > 1,
        });
    }
    catch (error) {
        console.error("Error getting customer orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCustomerOrders = getCustomerOrders;
const getCustomerStats = (req, res) => {
    try {
        const activeCustomers = customers.filter((c) => c.isActive).length;
        const inactiveCustomers = customers.filter((c) => !c.isActive).length;
        const businessCustomers = customers.filter((c) => c.type === "business").length;
        const individualCustomers = customers.filter((c) => c.type === "individual").length;
        const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
        const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
        res.json({
            totalCustomers: customers.length,
            activeCustomers,
            inactiveCustomers,
            businessCustomers,
            individualCustomers,
            totalRevenue,
            totalOrders,
            averageCustomerValue: customers.length > 0 ? totalRevenue / customers.length : 0,
        });
    }
    catch (error) {
        console.error("Error getting customer stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCustomerStats = getCustomerStats;
//# sourceMappingURL=customers.js.map