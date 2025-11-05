import { Request, Response } from "express";

// Mock supplier data
const suppliers = [
  {
    id: "SUPP-001",
    name: "Global Print Solutions",
    email: "orders@globalprint.com",
    phone: "+1 (555) 111-2222",
    website: "https://globalprint.com",
    type: "manufacturer",
    isActive: true,
    isPreferred: true,
    rating: 4.8,
    createdAt: "2024-01-10T10:30:00Z",
    updatedAt: "2024-01-22T14:30:00Z",
    address: {
      street: "123 Industrial Blvd",
      city: "Chicago",
      state: "IL",
      postalCode: "60601",
      country: "USA",
    },
    paymentTerms: "Net 30",
    totalOrders: 156,
    totalSpent: 485300.75,
    lastOrderDate: "2024-01-22T14:30:00Z",
    taxId: "12-3456789",
    categories: ["Printing", "Packaging", "Labels"],
    notes:
      "Reliable supplier with excellent quality control and fast turnaround times.",
    certifications: ["ISO 9001", "FSC Certified"],
    minimumOrderValue: 500,
    leadTime: 7,
    contacts: [
      {
        id: "contact-1",
        name: "Sarah Johnson",
        title: "Account Manager",
        department: "Sales",
        email: "sarah@globalprint.com",
        phone: "+1 (555) 111-2223",
        isPrimary: true,
      },
    ],
    performanceMetrics: {
      onTimeDelivery: 94.2,
      qualityRating: 4.7,
      responsiveness: 4.9,
      priceCompetitiveness: 4.5,
    },
  },
  {
    id: "SUPP-002",
    name: "Premium Textiles Inc",
    email: "sales@premiumtextiles.com",
    phone: "+1 (555) 222-3333",
    website: "https://premiumtextiles.com",
    type: "manufacturer",
    isActive: true,
    isPreferred: false,
    rating: 4.2,
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-20T11:45:00Z",
    address: {
      street: "456 Textile Drive",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    paymentTerms: "Net 45",
    totalOrders: 89,
    totalSpent: 234500.25,
    lastOrderDate: "2024-01-20T11:45:00Z",
    taxId: "98-7654321",
    categories: ["Apparel", "Fabric", "Embroidery"],
    notes:
      "High-quality textile supplier with extensive customization options.",
    certifications: ["OEKO-TEX", "GOTS"],
    minimumOrderValue: 1000,
    leadTime: 14,
    contacts: [],
    performanceMetrics: {
      onTimeDelivery: 88.5,
      qualityRating: 4.3,
      responsiveness: 4.1,
      priceCompetitiveness: 3.9,
    },
  },
  {
    id: "SUPP-003",
    name: "Tech Accessories Direct",
    email: "support@techaccessories.com",
    phone: "+1 (555) 333-4444",
    website: "https://techaccessories.com",
    type: "distributor",
    isActive: true,
    isPreferred: true,
    rating: 4.6,
    createdAt: "2024-01-05T16:20:00Z",
    updatedAt: "2024-01-21T13:15:00Z",
    address: {
      street: "789 Technology Park",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "USA",
    },
    paymentTerms: "Net 15",
    totalOrders: 203,
    totalSpent: 156750.5,
    lastOrderDate: "2024-01-21T13:15:00Z",
    taxId: "11-2233445",
    categories: ["Electronics", "Phone Cases", "Computer Accessories"],
    notes: "Fast delivery and competitive pricing for tech accessories.",
    certifications: ["ISO 14001"],
    minimumOrderValue: 250,
    leadTime: 3,
    contacts: [],
    performanceMetrics: {
      onTimeDelivery: 96.8,
      qualityRating: 4.5,
      responsiveness: 4.7,
      priceCompetitiveness: 4.8,
    },
  },
  {
    id: "SUPP-004",
    name: "European Imports Ltd",
    email: "orders@euroimports.co.uk",
    phone: "+44 20 7123 4567",
    website: "https://euroimports.co.uk",
    type: "importer",
    isActive: false,
    isPreferred: false,
    rating: 3.8,
    createdAt: "2023-12-15T10:00:00Z",
    updatedAt: "2023-12-20T10:30:00Z",
    address: {
      street: "321 Commerce Street",
      city: "London",
      state: "England",
      postalCode: "EC1A 1BB",
      country: "United Kingdom",
    },
    paymentTerms: "Net 60",
    totalOrders: 45,
    totalSpent: 89200.0,
    lastOrderDate: "2023-12-20T10:30:00Z",
    taxId: "GB123456789",
    categories: ["Luxury Goods", "Promotional Items"],
    notes: "Currently on hold due to delivery issues.",
    certifications: [],
    minimumOrderValue: 2000,
    leadTime: 21,
    contacts: [],
    performanceMetrics: {
      onTimeDelivery: 72.3,
      qualityRating: 3.9,
      responsiveness: 3.2,
      priceCompetitiveness: 4.1,
    },
  },
];

// GET /api/suppliers - Get all suppliers with filtering and pagination
export const getSuppliers = (req: Request, res: Response): void => {
  try {
    const {
      page = "1",
      limit = "10",
      search,
      type,
      status,
      preferred,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    let filteredSuppliers = [...suppliers];

    // Search filter
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredSuppliers = filteredSuppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm) ||
          supplier.email.toLowerCase().includes(searchTerm) ||
          supplier.categories.some((cat) =>
            cat.toLowerCase().includes(searchTerm)
          ) ||
          supplier.address.city.toLowerCase().includes(searchTerm) ||
          supplier.id.toLowerCase().includes(searchTerm)
      );
    }

    // Type filter
    if (type && type !== "all") {
      filteredSuppliers = filteredSuppliers.filter(
        (supplier) => supplier.type === type
      );
    }

    // Status filter
    if (status && status !== "all") {
      const isActive = status === "active";
      filteredSuppliers = filteredSuppliers.filter(
        (supplier) => supplier.isActive === isActive
      );
    }

    // Preferred filter
    if (preferred && preferred !== "all") {
      const isPreferred = preferred === "preferred";
      filteredSuppliers = filteredSuppliers.filter(
        (supplier) => supplier.isPreferred === isPreferred
      );
    }

    // Sorting
    filteredSuppliers.sort((a: any, b: any) => {
      let aValue = a[sortBy as string];
      let bValue = b[sortBy as string];

      if (
        sortBy === "createdAt" ||
        sortBy === "updatedAt" ||
        sortBy === "lastOrderDate"
      ) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedSuppliers = filteredSuppliers.slice(startIndex, endIndex);

    res.json({
      suppliers: paginatedSuppliers,
      totalCount: filteredSuppliers.length,
      totalPages: Math.ceil(filteredSuppliers.length / limitNum),
      currentPage: pageNum,
      hasNextPage: endIndex < filteredSuppliers.length,
      hasPrevPage: pageNum > 1,
    });
  } catch (error) {
    console.error("Error getting suppliers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/suppliers/:id - Get specific supplier
export const getSupplier = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const supplier = suppliers.find((s) => s.id === id);

    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }

    res.json(supplier);
  } catch (error) {
    console.error("Error getting supplier:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/suppliers - Create new supplier
export const createSupplier = (req: Request, res: Response): void => {
  try {
    const {
      name,
      email,
      phone,
      website,
      type,
      address,
      paymentTerms,
      taxId,
      notes,
      categories,
      certifications,
      contacts,
      isPreferred,
      minimumOrderValue,
      leadTime,
    } = req.body;

    // Basic validation
    if (!name || !email || !type || !address) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Generate new supplier ID
    const supplierCount = suppliers.length;
    const newId = `SUPP-${String(supplierCount + 1).padStart(3, "0")}`;

    const newSupplier = {
      id: newId,
      name,
      email,
      phone: phone || "",
      website: website || "",
      type,
      isActive: true,
      isPreferred: isPreferred || false,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      address,
      paymentTerms: paymentTerms || "Net 30",
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: new Date().toISOString(),
      taxId: taxId || "",
      categories: categories || [],
      notes: notes || "",
      certifications: certifications || [],
      minimumOrderValue: parseFloat(minimumOrderValue) || 0,
      leadTime: parseInt(leadTime) || 0,
      contacts: contacts || [],
      performanceMetrics: {
        onTimeDelivery: 0,
        qualityRating: 0,
        responsiveness: 0,
        priceCompetitiveness: 0,
      },
    };

    suppliers.push(newSupplier);

    res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/suppliers/:id - Update supplier
export const updateSupplier = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const supplierIndex = suppliers.findIndex((s) => s.id === id);

    if (supplierIndex === -1) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }

    const {
      name,
      email,
      phone,
      website,
      type,
      address,
      paymentTerms,
      taxId,
      notes,
      categories,
      certifications,
      contacts,
      isActive,
      isPreferred,
      minimumOrderValue,
      leadTime,
    } = req.body;

    // Update supplier data
    const updatedSupplier = {
      ...suppliers[supplierIndex],
      name: name || suppliers[supplierIndex].name,
      email: email || suppliers[supplierIndex].email,
      phone: phone !== undefined ? phone : suppliers[supplierIndex].phone,
      website:
        website !== undefined ? website : suppliers[supplierIndex].website,
      type: type || suppliers[supplierIndex].type,
      address: address || suppliers[supplierIndex].address,
      paymentTerms: paymentTerms || suppliers[supplierIndex].paymentTerms,
      taxId: taxId !== undefined ? taxId : suppliers[supplierIndex].taxId,
      notes: notes !== undefined ? notes : suppliers[supplierIndex].notes,
      categories: categories || suppliers[supplierIndex].categories,
      certifications: certifications || suppliers[supplierIndex].certifications,
      contacts: contacts || suppliers[supplierIndex].contacts,
      isActive:
        isActive !== undefined ? isActive : suppliers[supplierIndex].isActive,
      isPreferred:
        isPreferred !== undefined
          ? isPreferred
          : suppliers[supplierIndex].isPreferred,
      minimumOrderValue:
        minimumOrderValue !== undefined
          ? parseFloat(minimumOrderValue)
          : suppliers[supplierIndex].minimumOrderValue,
      leadTime:
        leadTime !== undefined
          ? parseInt(leadTime)
          : suppliers[supplierIndex].leadTime,
      updatedAt: new Date().toISOString(),
    };

    suppliers[supplierIndex] = updatedSupplier;

    res.json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /api/suppliers/:id/status - Update supplier status
export const updateSupplierStatus = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const supplierIndex = suppliers.findIndex((s) => s.id === id);

    if (supplierIndex === -1) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }

    suppliers[supplierIndex] = {
      ...suppliers[supplierIndex],
      isActive,
      updatedAt: new Date().toISOString(),
    };

    res.json(suppliers[supplierIndex]);
  } catch (error) {
    console.error("Error updating supplier status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /api/suppliers/:id/preferred - Update supplier preferred status
export const updateSupplierPreferred = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { isPreferred } = req.body;

    const supplierIndex = suppliers.findIndex((s) => s.id === id);

    if (supplierIndex === -1) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }

    suppliers[supplierIndex] = {
      ...suppliers[supplierIndex],
      isPreferred,
      updatedAt: new Date().toISOString(),
    };

    res.json(suppliers[supplierIndex]);
  } catch (error) {
    console.error("Error updating supplier preferred status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/suppliers/:id - Delete supplier
export const deleteSupplier = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const supplierIndex = suppliers.findIndex((s) => s.id === id);

    if (supplierIndex === -1) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }

    // Check if supplier has orders (in a real app, you'd check the database)
    const supplier = suppliers[supplierIndex];
    if (supplier.totalOrders > 0) {
      res.status(400).json({
        error:
          "Cannot delete supplier with existing orders. Deactivate instead.",
      });
      return;
    }

    const deletedSupplier = suppliers.splice(supplierIndex, 1)[0];
    res.json({
      message: "Supplier deleted successfully",
      supplier: deletedSupplier,
    });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/suppliers/search - Search suppliers (for autocomplete)
export const searchSuppliers = (req: Request, res: Response): void => {
  try {
    const { q, limit = "10" } = req.query;

    if (!q) {
      res.json([]);
      return;
    }

    const searchTerm = (q as string).toLowerCase();
    const limitNum = parseInt(limit as string);

    const filteredSuppliers = suppliers
      .filter(
        (supplier) =>
          supplier.isActive &&
          (supplier.name.toLowerCase().includes(searchTerm) ||
            supplier.email.toLowerCase().includes(searchTerm) ||
            supplier.id.toLowerCase().includes(searchTerm) ||
            supplier.categories.some((cat) =>
              cat.toLowerCase().includes(searchTerm)
            ))
      )
      .slice(0, limitNum)
      .map((supplier) => ({
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
        type: supplier.type,
        categories: supplier.categories,
        isPreferred: supplier.isPreferred,
      }));

    res.json(filteredSuppliers);
  } catch (error) {
    console.error("Error searching suppliers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/suppliers/:id/orders - Get supplier orders
export const getSupplierOrders = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const { page = "1", limit = "10" } = req.query;

    const supplier = suppliers.find((s) => s.id === id);
    if (!supplier) {
      res.status(404).json({ error: "Supplier not found" });
      return;
    }

    // Mock supplier orders - in a real app, you'd fetch from orders table
    const mockOrders = [
      {
        id: "PO-001",
        orderNumber: "PO-001",
        supplierId: id,
        supplierName: supplier.name,
        date: "2024-01-22T14:30:00Z",
        status: "delivered",
        total: 3250.0,
        items: 5,
      },
      {
        id: "PO-002",
        orderNumber: "PO-002",
        supplierId: id,
        supplierName: supplier.name,
        date: "2024-01-18T09:15:00Z",
        status: "delivered",
        total: 1875.5,
        items: 3,
      },
    ];

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
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
  } catch (error) {
    console.error("Error getting supplier orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/suppliers/stats - Get supplier statistics
export const getSupplierStats = (req: Request, res: Response): void => {
  try {
    const activeSuppliers = suppliers.filter((s) => s.isActive).length;
    const inactiveSuppliers = suppliers.filter((s) => !s.isActive).length;
    const preferredSuppliers = suppliers.filter((s) => s.isPreferred).length;
    const manufacturerCount = suppliers.filter(
      (s) => s.type === "manufacturer"
    ).length;
    const distributorCount = suppliers.filter(
      (s) => s.type === "distributor"
    ).length;
    const totalSpend = suppliers.reduce((sum, s) => sum + s.totalSpent, 0);
    const totalOrders = suppliers.reduce((sum, s) => sum + s.totalOrders, 0);
    const avgRating =
      suppliers.length > 0
        ? suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length
        : 0;

    res.json({
      totalSuppliers: suppliers.length,
      activeSuppliers,
      inactiveSuppliers,
      preferredSuppliers,
      manufacturerCount,
      distributorCount,
      totalSpend,
      totalOrders,
      averageRating: avgRating,
      averageSpendPerSupplier:
        suppliers.length > 0 ? totalSpend / suppliers.length : 0,
    });
  } catch (error) {
    console.error("Error getting supplier stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/suppliers/categories - Get all supplier categories
export const getSupplierCategories = (req: Request, res: Response): void => {
  try {
    const allCategories = suppliers.reduce((cats: string[], supplier) => {
      supplier.categories.forEach((cat) => {
        if (!cats.includes(cat)) {
          cats.push(cat);
        }
      });
      return cats;
    }, []);

    res.json(allCategories.sort());
  } catch (error) {
    console.error("Error getting supplier categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
