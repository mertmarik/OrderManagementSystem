export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SALES = "SALES",
    CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
    PRODUCTION = "PRODUCTION",
    SUPPLIER = "SUPPLIER",
    CUSTOMER = "CUSTOMER"
}
export interface Order {
    id: string;
    orderNumber: string;
    customerId: string;
    status: OrderStatus;
    type: OrderType;
    items: OrderItem[];
    totalAmount: number;
    currency: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
}
export declare enum OrderStatus {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    IN_PRODUCTION = "IN_PRODUCTION",
    READY_TO_SHIP = "READY_TO_SHIP",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED"
}
export declare enum OrderType {
    SALES_ORDER = "SALES_ORDER",
    PURCHASE_ORDER = "PURCHASE_ORDER",
    RETURN_ORDER = "RETURN_ORDER"
}
export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specifications?: Record<string, any>;
}
export interface Product {
    id: string;
    sku: string;
    name: string;
    description?: string;
    category: string;
    unitPrice: number;
    currency: string;
    stockQuantity: number;
    minStockLevel: number;
    isActive: boolean;
    supplierId?: string;
    attributes: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
export interface Customer {
    id: string;
    type: CustomerType;
    name: string;
    email: string;
    phone?: string;
    address: Address;
    creditLimit?: number;
    paymentTerms?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum CustomerType {
    INDIVIDUAL = "INDIVIDUAL",
    BUSINESS = "BUSINESS"
}
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface Supplier {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address: Address;
    paymentTerms?: string;
    isActive: boolean;
    integrations: SupplierIntegration[];
    createdAt: Date;
    updatedAt: Date;
}
export interface SupplierIntegration {
    type: IntegrationType;
    config: Record<string, any>;
    isActive: boolean;
}
export declare enum IntegrationType {
    ESP = "ESP",
    SAGE = "SAGE",
    DISTRIBUTOR_CENTRAL = "DISTRIBUTOR_CENTRAL",
    CUSTOM_API = "CUSTOM_API"
}
export interface Invoice {
    id: string;
    invoiceNumber: string;
    orderId: string;
    customerId: string;
    status: InvoiceStatus;
    items: InvoiceItem[];
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    currency: string;
    issuedAt: Date;
    dueDate: Date;
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum InvoiceStatus {
    DRAFT = "DRAFT",
    SENT = "SENT",
    VIEWED = "VIEWED",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    CANCELLED = "CANCELLED"
}
export interface InvoiceItem {
    id: string;
    productId: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export interface HubSpotContact {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    phone?: string;
    properties: Record<string, any>;
}
export interface SlackNotification {
    channel: string;
    message: string;
    priority: NotificationPriority;
    attachments?: any[];
}
export declare enum NotificationPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        code?: string;
    };
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface SocketEvent {
    type: string;
    payload: any;
    timestamp: Date;
    userId?: string;
}
export declare enum SocketEventType {
    ORDER_UPDATED = "ORDER_UPDATED",
    ORDER_STATUS_CHANGED = "ORDER_STATUS_CHANGED",
    INVOICE_GENERATED = "INVOICE_GENERATED",
    PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
    STOCK_ALERT = "STOCK_ALERT",
    NEW_ORDER = "NEW_ORDER"
}
//# sourceMappingURL=types.d.ts.map