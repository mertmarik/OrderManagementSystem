"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  PrinterIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  TruckIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface OrderDetails {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    type: "individual" | "business";
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  status: string;
  type: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  notes?: string;
  items: Array<{
    id: string;
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specifications?: Record<string, any>;
  }>;
  timeline: Array<{
    id: string;
    action: string;
    timestamp: string;
    user: string;
    details?: string;
  }>;
}

// Mock data - replace with actual API call
const mockOrderDetails: OrderDetails = {
  id: "ORD-001",
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
    {
      id: "3",
      action: "Production Started",
      timestamp: "2024-01-16T09:00:00Z",
      user: "Mike Wilson",
      details: "Order sent to production facility",
    },
  ],
};

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  in_production: "bg-blue-100 text-blue-800",
  ready_to_ship: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-orange-100 text-orange-800",
};

const statusIcons = {
  draft: ExclamationTriangleIcon,
  pending: ClockIcon,
  confirmed: CheckCircleIcon,
  in_production: BuildingOfficeIcon,
  ready_to_ship: TruckIcon,
  shipped: TruckIcon,
  delivered: CheckCircleIcon,
  cancelled: ExclamationTriangleIcon,
  returned: ExclamationTriangleIcon,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual implementation
    const fetchOrder = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setOrder(mockOrderDetails);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.id]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found.</p>
        <Link
          href="/dashboard/orders"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-x-3">
          <Link
            href="/dashboard/orders"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <h1 className="text-2xl font-bold leading-7 text-gray-900">
              {order.orderNumber}
            </h1>
            <span
              className={classNames(
                "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-sm font-medium",
                statusColors[order.status as keyof typeof statusColors]
              )}
            >
              <StatusIcon className="h-4 w-4" />
              {order.status
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              Duplicate
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PrinterIcon className="h-4 w-4" />
              Print
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <EnvelopeIcon className="h-4 w-4" />
              Email
            </button>
            <Link
              href={`/dashboard/orders/${order.id}/edit`}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.productName}
                          </div>
                          {item.specifications && (
                            <div className="text-xs text-gray-500 mt-1">
                              {Object.entries(item.specifications).map(
                                ([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium">{key}:</span>{" "}
                                    {value}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatCurrency(item.unitPrice, order.currency)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {formatCurrency(item.totalPrice, order.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Total */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end">
                <div className="w-80">
                  <dl className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Subtotal:</dt>
                      <dd className="text-gray-900">
                        {formatCurrency(
                          order.totalAmount * 0.925,
                          order.currency
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Tax (8%):</dt>
                      <dd className="text-gray-900">
                        {formatCurrency(
                          order.totalAmount * 0.075,
                          order.currency
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-medium">
                      <dt className="text-gray-900">Total:</dt>
                      <dd className="text-gray-900">
                        {formatCurrency(order.totalAmount, order.currency)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Order Timeline
              </h2>
            </div>
            <div className="px-6 py-5">
              <div className="flow-root">
                <ul className="-mb-8">
                  {order.timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== order.timeline.length - 1 ? (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                              <CheckCircleIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-900">
                                {event.action}{" "}
                                <span className="font-medium text-gray-900">
                                  by {event.user}
                                </span>
                              </p>
                              {event.details && (
                                <p className="text-sm text-gray-500">
                                  {event.details}
                                </p>
                              )}
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              {formatDate(event.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Notes</h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-gray-700">{order.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Order Information
              </h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center text-sm">
                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(order.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">Order Type</p>
                  <p className="font-medium text-gray-900">
                    {order.type
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Customer</h2>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center mb-4">
                {order.customer.type === "business" ? (
                  <BuildingOfficeIcon className="h-8 w-8 text-gray-400 mr-3" />
                ) : (
                  <UserIcon className="h-8 w-8 text-gray-400 mr-3" />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {order.customer.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.customer.email}
                  </p>
                  {order.customer.phone && (
                    <p className="text-sm text-gray-500">
                      {order.customer.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Billing Address</p>
                <p>{order.customer.address.street}</p>
                <p>
                  {order.customer.address.city}, {order.customer.address.state}{" "}
                  {order.customer.address.postalCode}
                </p>
                <p>{order.customer.address.country}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="px-6 py-5 space-y-3">
              <button
                type="button"
                className="w-full text-left rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Create Invoice
              </button>
              <button
                type="button"
                className="w-full text-left rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Update Status
              </button>
              <button
                type="button"
                className="w-full text-left rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Add to Production Queue
              </button>
              <button
                type="button"
                className="w-full text-left rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Send Update to Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
