"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEventType = exports.NotificationPriority = exports.InvoiceStatus = exports.IntegrationType = exports.CustomerType = exports.OrderType = exports.OrderStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["SALES"] = "SALES";
    UserRole["CUSTOMER_SERVICE"] = "CUSTOMER_SERVICE";
    UserRole["PRODUCTION"] = "PRODUCTION";
    UserRole["SUPPLIER"] = "SUPPLIER";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (exports.UserRole = UserRole = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DRAFT"] = "DRAFT";
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["IN_PRODUCTION"] = "IN_PRODUCTION";
    OrderStatus["READY_TO_SHIP"] = "READY_TO_SHIP";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["RETURNED"] = "RETURNED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderType;
(function (OrderType) {
    OrderType["SALES_ORDER"] = "SALES_ORDER";
    OrderType["PURCHASE_ORDER"] = "PURCHASE_ORDER";
    OrderType["RETURN_ORDER"] = "RETURN_ORDER";
})(OrderType || (exports.OrderType = OrderType = {}));
var CustomerType;
(function (CustomerType) {
    CustomerType["INDIVIDUAL"] = "INDIVIDUAL";
    CustomerType["BUSINESS"] = "BUSINESS";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
var IntegrationType;
(function (IntegrationType) {
    IntegrationType["ESP"] = "ESP";
    IntegrationType["SAGE"] = "SAGE";
    IntegrationType["DISTRIBUTOR_CENTRAL"] = "DISTRIBUTOR_CENTRAL";
    IntegrationType["CUSTOM_API"] = "CUSTOM_API";
})(IntegrationType || (exports.IntegrationType = IntegrationType = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "DRAFT";
    InvoiceStatus["SENT"] = "SENT";
    InvoiceStatus["VIEWED"] = "VIEWED";
    InvoiceStatus["PAID"] = "PAID";
    InvoiceStatus["OVERDUE"] = "OVERDUE";
    InvoiceStatus["CANCELLED"] = "CANCELLED";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "LOW";
    NotificationPriority["MEDIUM"] = "MEDIUM";
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["URGENT"] = "URGENT";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
var SocketEventType;
(function (SocketEventType) {
    SocketEventType["ORDER_UPDATED"] = "ORDER_UPDATED";
    SocketEventType["ORDER_STATUS_CHANGED"] = "ORDER_STATUS_CHANGED";
    SocketEventType["INVOICE_GENERATED"] = "INVOICE_GENERATED";
    SocketEventType["PAYMENT_RECEIVED"] = "PAYMENT_RECEIVED";
    SocketEventType["STOCK_ALERT"] = "STOCK_ALERT";
    SocketEventType["NEW_ORDER"] = "NEW_ORDER";
})(SocketEventType || (exports.SocketEventType = SocketEventType = {}));
//# sourceMappingURL=types.js.map