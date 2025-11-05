import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

// Mock invoice data
const mockInvoices = [
  {
    id: "INV-001",
    number: "INV-001",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    customerEmail: "orders@acme.com",
    customerType: "business",
    orderId: "ORD-001",
    status: "sent",
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    paymentTerms: "Net 30",
    subtotal: 1575.0,
    discountAmount: 75.0,
    taxRate: 10,
    taxAmount: 150.0,
    total: 1650.0,
    paidAmount: 500.0,
    notes:
      "Thank you for your business. Payment is due within 30 days of invoice date.",
    items: [
      {
        id: "item-1",
        productId: "PROD-001",
        description: "Custom T-Shirts - Navy Blue with Logo",
        quantity: 100,
        unitPrice: 15.0,
        total: 1500.0,
      },
      {
        id: "item-2",
        productId: "PROD-002",
        description: "Setup Fee for Custom Design",
        quantity: 1,
        unitPrice: 75.0,
        total: 75.0,
      },
    ],
    paymentHistory: [
      {
        id: "payment-1",
        date: "2024-01-20",
        amount: 500.0,
        method: "Credit Card",
        reference: "ch_1234567890",
        status: "completed",
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z",
  },
  {
    id: "INV-002",
    number: "INV-002",
    customerId: "CUST-002",
    customerName: "Beta Industries",
    customerEmail: "procurement@beta.com",
    customerType: "business",
    orderId: "ORD-002",
    status: "paid",
    issueDate: "2024-01-10",
    dueDate: "2024-02-09",
    paymentTerms: "Net 30",
    subtotal: 850.0,
    discountAmount: 0,
    taxRate: 10,
    taxAmount: 85.0,
    total: 935.0,
    paidAmount: 935.0,
    notes: "Business cards for new employee onboarding.",
    items: [
      {
        id: "item-3",
        productId: "PROD-003",
        description: "Business Cards - Premium Finish",
        quantity: 1000,
        unitPrice: 0.85,
        total: 850.0,
      },
    ],
    paymentHistory: [
      {
        id: "payment-2",
        date: "2024-01-25",
        amount: 935.0,
        method: "Bank Transfer",
        reference: "wire_9876543210",
        status: "completed",
      },
    ],
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-25T09:15:00Z",
  },
  {
    id: "INV-003",
    number: "INV-003",
    customerId: "CUST-003",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerType: "individual",
    orderId: null,
    status: "overdue",
    issueDate: "2023-12-20",
    dueDate: "2024-01-19",
    paymentTerms: "Net 30",
    subtotal: 550.0,
    discountAmount: 50.0,
    taxRate: 10,
    taxAmount: 50.0,
    total: 550.0,
    paidAmount: 0,
    notes: "Logo design service for new business venture.",
    items: [
      {
        id: "item-4",
        productId: "PROD-004",
        description: "Logo Design Service - Complete Package",
        quantity: 1,
        unitPrice: 500.0,
        total: 500.0,
      },
      {
        id: "item-5",
        productId: "PROD-005",
        description: "Business Card Design Add-on",
        quantity: 1,
        unitPrice: 100.0,
        total: 100.0,
      },
    ],
    paymentHistory: [],
    createdAt: "2023-12-20T11:45:00Z",
    updatedAt: "2023-12-20T11:45:00Z",
  },
  {
    id: "INV-004",
    number: "INV-004",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    customerEmail: "orders@acme.com",
    customerType: "business",
    orderId: "ORD-003",
    status: "draft",
    issueDate: "2024-01-25",
    dueDate: "2024-02-24",
    paymentTerms: "Net 30",
    subtotal: 425.0,
    discountAmount: 25.0,
    taxRate: 10,
    taxAmount: 40.0,
    total: 440.0,
    paidAmount: 0,
    notes: "Promotional materials for upcoming trade show.",
    items: [
      {
        id: "item-6",
        productId: "PROD-006",
        description: "Promotional Mugs - Custom Branded",
        quantity: 50,
        unitPrice: 8.5,
        total: 425.0,
      },
    ],
    paymentHistory: [],
    createdAt: "2024-01-25T16:30:00Z",
    updatedAt: "2024-01-25T16:30:00Z",
  },
  {
    id: "INV-005",
    number: "INV-005",
    customerId: "CUST-004",
    customerName: "Gamma Solutions",
    customerEmail: "finance@gamma.com",
    customerType: "business",
    orderId: "ORD-004",
    status: "cancelled",
    issueDate: "2024-01-12",
    dueDate: "2024-02-11",
    paymentTerms: "Net 30",
    subtotal: 1200.0,
    discountAmount: 0,
    taxRate: 10,
    taxAmount: 120.0,
    total: 1320.0,
    paidAmount: 0,
    notes: "Order cancelled due to specification changes.",
    items: [
      {
        id: "item-7",
        productId: "PROD-007",
        description: "Custom Packaging Design",
        quantity: 1,
        unitPrice: 1200.0,
        total: 1200.0,
      },
    ],
    paymentHistory: [],
    createdAt: "2024-01-12T13:15:00Z",
    updatedAt: "2024-01-15T10:20:00Z",
  },
];

// Helper function to calculate invoice status based on dates and payments
const calculateInvoiceStatus = (invoice: any) => {
  if (invoice.status === "cancelled" || invoice.status === "draft") {
    return invoice.status;
  }

  if (invoice.paidAmount >= invoice.total) {
    return "paid";
  }

  const dueDate = new Date(invoice.dueDate);
  const today = new Date();

  if (dueDate < today && invoice.paidAmount < invoice.total) {
    return "overdue";
  }

  return invoice.status;
};

// GET /api/invoices - Get all invoices with filtering and pagination
router.get("/", (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      status = "",
      customerType = "",
      dateFrom = "",
      dateTo = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    let filteredInvoices = [...mockInvoices];

    // Apply search filter
    if (search) {
      const searchTerm = search.toString().toLowerCase();
      filteredInvoices = filteredInvoices.filter(
        (invoice) =>
          invoice.number.toLowerCase().includes(searchTerm) ||
          invoice.customerName.toLowerCase().includes(searchTerm) ||
          invoice.customerEmail.toLowerCase().includes(searchTerm) ||
          (invoice.orderId &&
            invoice.orderId.toLowerCase().includes(searchTerm))
      );
    }

    // Apply status filter
    if (status) {
      filteredInvoices = filteredInvoices.filter((invoice) => {
        const currentStatus = calculateInvoiceStatus(invoice);
        return currentStatus === status;
      });
    }

    // Apply customer type filter
    if (customerType) {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.customerType === customerType
      );
    }

    // Apply date range filter
    if (dateFrom || dateTo) {
      filteredInvoices = filteredInvoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.issueDate);
        const fromDate = dateFrom ? new Date(dateFrom.toString()) : null;
        const toDate = dateTo ? new Date(dateTo.toString()) : null;

        if (fromDate && invoiceDate < fromDate) return false;
        if (toDate && invoiceDate > toDate) return false;
        return true;
      });
    }

    // Apply sorting
    filteredInvoices.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];

      // Handle date sorting
      if (
        sortBy === "createdAt" ||
        sortBy === "issueDate" ||
        sortBy === "dueDate"
      ) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === "desc") {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    // Calculate pagination
    const pageNum = parseInt(page.toString());
    const pageSize = parseInt(limit.toString());
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

    // Add calculated status to each invoice
    const invoicesWithStatus = paginatedInvoices.map((invoice) => ({
      ...invoice,
      status: calculateInvoiceStatus(invoice),
      remainingBalance: invoice.total - invoice.paidAmount,
    }));

    // Calculate summary statistics
    const totalInvoices = filteredInvoices.length;
    const totalAmount = filteredInvoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0
    );
    const totalPaid = filteredInvoices.reduce(
      (sum, invoice) => sum + invoice.paidAmount,
      0
    );
    const totalOverdue = filteredInvoices
      .filter((invoice) => calculateInvoiceStatus(invoice) === "overdue")
      .reduce((sum, invoice) => sum + (invoice.total - invoice.paidAmount), 0);

    res.json({
      invoices: invoicesWithStatus,
      pagination: {
        page: pageNum,
        limit: pageSize,
        total: totalInvoices,
        pages: Math.ceil(totalInvoices / pageSize),
      },
      summary: {
        totalInvoices,
        totalAmount,
        totalPaid,
        totalOverdue,
      },
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/invoices/:id - Get a specific invoice
router.get("/:id", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const invoice = mockInvoices.find((inv) => inv.id === id);

    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    const invoiceWithStatus = {
      ...invoice,
      status: calculateInvoiceStatus(invoice),
      remainingBalance: invoice.total - invoice.paidAmount,
    };

    res.json(invoiceWithStatus);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/invoices - Create a new invoice
router.post("/", (req: Request, res: Response): void => {
  try {
    const {
      customerId,
      customerName,
      customerEmail,
      customerType,
      orderId,
      issueDate,
      dueDate,
      paymentTerms,
      items,
      taxRate,
      discountAmount = 0,
      notes = "",
    } = req.body;

    // Validate required fields
    if (
      !customerId ||
      !customerName ||
      !issueDate ||
      !dueDate ||
      !items ||
      items.length === 0
    ) {
      res.status(400).json({
        error:
          "Missing required fields: customerId, customerName, issueDate, dueDate, and items are required",
      });
      return;
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    );
    const discountedSubtotal = subtotal - discountAmount;
    const taxAmount = (discountedSubtotal * taxRate) / 100;
    const total = discountedSubtotal + taxAmount;

    // Generate new invoice ID
    const newInvoiceNumber = `INV-${String(mockInvoices.length + 1).padStart(
      3,
      "0"
    )}`;

    const newInvoice = {
      id: newInvoiceNumber,
      number: newInvoiceNumber,
      customerId,
      customerName,
      customerEmail: customerEmail || "",
      customerType: customerType || "business",
      orderId: orderId || null,
      status: "draft",
      issueDate,
      dueDate,
      paymentTerms,
      subtotal,
      discountAmount,
      taxRate,
      taxAmount,
      total,
      paidAmount: 0,
      notes,
      items: items.map((item: any, index: number) => ({
        id: `item-${Date.now()}-${index}`,
        productId: item.productId || "",
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      })),
      paymentHistory: [] as any[],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockInvoices.push(newInvoice);

    res.status(201).json({
      ...newInvoice,
      remainingBalance: newInvoice.total - newInvoice.paidAmount,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/invoices/:id - Update an existing invoice
router.put("/:id", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const invoiceIndex = mockInvoices.findIndex((inv) => inv.id === id);

    if (invoiceIndex === -1) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    const existingInvoice = mockInvoices[invoiceIndex];
    const updates = req.body;

    // Recalculate totals if items or pricing fields are updated
    if (
      updates.items ||
      updates.taxRate !== undefined ||
      updates.discountAmount !== undefined
    ) {
      const items = updates.items || existingInvoice.items;
      const taxRate =
        updates.taxRate !== undefined
          ? updates.taxRate
          : existingInvoice.taxRate;
      const discountAmount =
        updates.discountAmount !== undefined
          ? updates.discountAmount
          : existingInvoice.discountAmount;

      const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.quantity * item.unitPrice,
        0
      );
      const discountedSubtotal = subtotal - discountAmount;
      const taxAmount = (discountedSubtotal * taxRate) / 100;
      const total = discountedSubtotal + taxAmount;

      updates.subtotal = subtotal;
      updates.taxAmount = taxAmount;
      updates.total = total;
    }

    const updatedInvoice = {
      ...existingInvoice,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    mockInvoices[invoiceIndex] = updatedInvoice;

    res.json({
      ...updatedInvoice,
      status: calculateInvoiceStatus(updatedInvoice),
      remainingBalance: updatedInvoice.total - updatedInvoice.paidAmount,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/invoices/:id/send - Send an invoice
router.post("/:id/send", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const invoiceIndex = mockInvoices.findIndex((inv) => inv.id === id);

    if (invoiceIndex === -1) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    const invoice = mockInvoices[invoiceIndex];

    if (invoice.status === "cancelled") {
      res.status(400).json({ error: "Cannot send a cancelled invoice" });
      return;
    }

    mockInvoices[invoiceIndex] = {
      ...invoice,
      status: "sent",
      updatedAt: new Date().toISOString(),
    };

    res.json({
      message: "Invoice sent successfully",
      invoice: {
        ...mockInvoices[invoiceIndex],
        status: calculateInvoiceStatus(mockInvoices[invoiceIndex]),
        remainingBalance:
          mockInvoices[invoiceIndex].total -
          mockInvoices[invoiceIndex].paidAmount,
      },
    });
  } catch (error) {
    console.error("Error sending invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/invoices/:id/payments - Add a payment to an invoice
router.post("/:id/payments", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { amount, method, reference, date } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ error: "Valid payment amount is required" });
      return;
    }

    const invoiceIndex = mockInvoices.findIndex((inv) => inv.id === id);

    if (invoiceIndex === -1) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    const invoice = mockInvoices[invoiceIndex];

    if (invoice.status === "cancelled") {
      res
        .status(400)
        .json({ error: "Cannot add payment to a cancelled invoice" });
      return;
    }

    const newPayment = {
      id: `payment-${Date.now()}`,
      date: date || new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      method: method || "Manual Entry",
      reference: reference || "",
      status: "completed",
    };

    const updatedPaidAmount = invoice.paidAmount + newPayment.amount;

    (mockInvoices[invoiceIndex] as any) = {
      ...invoice,
      paidAmount: updatedPaidAmount,
      paymentHistory: [...invoice.paymentHistory, newPayment],
      updatedAt: new Date().toISOString(),
    };

    res.json({
      message: "Payment added successfully",
      payment: newPayment,
      invoice: {
        ...mockInvoices[invoiceIndex],
        status: calculateInvoiceStatus(mockInvoices[invoiceIndex]),
        remainingBalance:
          mockInvoices[invoiceIndex].total -
          mockInvoices[invoiceIndex].paidAmount,
      },
    });
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/invoices/:id - Delete an invoice (soft delete by marking as cancelled)
router.delete("/:id", (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const invoiceIndex = mockInvoices.findIndex((inv) => inv.id === id);

    if (invoiceIndex === -1) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }

    const invoice = mockInvoices[invoiceIndex];

    if (invoice.paidAmount > 0) {
      res.status(400).json({
        error:
          "Cannot delete an invoice with payments. Cancel the invoice instead.",
      });
      return;
    }

    mockInvoices[invoiceIndex] = {
      ...invoice,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };

    res.json({
      message: "Invoice cancelled successfully",
      invoice: {
        ...mockInvoices[invoiceIndex],
        status: "cancelled",
        remainingBalance: 0,
      },
    });
  } catch (error) {
    console.error("Error cancelling invoice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as invoiceRoutes };
