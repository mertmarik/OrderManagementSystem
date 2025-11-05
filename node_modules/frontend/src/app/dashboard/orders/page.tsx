"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

// Mock data - replace with actual API calls
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
  {
    id: "ORD-003",
    orderNumber: "ORD-2024-003",
    customer: "Gamma LLC",
    status: "shipped",
    type: "sales_order",
    totalAmount: 3890.0,
    currency: "USD",
    createdAt: "2024-01-13T09:15:00Z",
    dueDate: "2024-02-10T00:00:00Z",
    items: [
      { productName: "Promotional Banners", quantity: 20, unitPrice: 194.5 },
    ],
  },
  {
    id: "ORD-004",
    orderNumber: "ORD-2024-004",
    customer: "Delta Corp",
    status: "pending",
    type: "purchase_order",
    totalAmount: 856.0,
    currency: "USD",
    createdAt: "2024-01-12T16:45:00Z",
    dueDate: "2024-02-05T00:00:00Z",
    items: [{ productName: "Raw Materials", quantity: 500, unitPrice: 1.71 }],
  },
];

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

const typeLabels = {
  sales_order: "Sales Order",
  purchase_order: "Purchase Order",
  return_order: "Return Order",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((order) => order.type === typeFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, typeFilter]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length
        ? []
        : filteredOrders.map((order) => order.id)
    );
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Orders
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all your sales orders, purchase orders, and returns in one
            place.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/orders/new"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Order
          </Link>
        </div>
      </div>

      {/* Filters and search */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-x-4">
          {/* Search */}
          <div className="relative flex flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_production">In Production</option>
            <option value="ready_to_ship">Ready to Ship</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Types</option>
            <option value="sales_order">Sales Orders</option>
            <option value="purchase_order">Purchase Orders</option>
            <option value="return_order">Return Orders</option>
          </select>
        </div>

        <div className="flex gap-x-2">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <ArrowDownTrayIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            Export
          </button>
        </div>
      </div>

      {/* Orders table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        checked={
                          selectedOrders.length === filteredOrders.length &&
                          filteredOrders.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Order Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Due Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="hover:text-indigo-600"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {typeLabels[order.type as keyof typeof typeLabels]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            statusColors[
                              order.status as keyof typeof statusColors
                            ]
                          )}
                        >
                          {order.status
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        {formatCurrency(order.totalAmount, order.currency)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.dueDate)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center gap-x-2">
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">
                              View order {order.orderNumber}
                            </span>
                          </Link>
                          <Link
                            href={`/dashboard/orders/${order.id}/edit`}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Edit order {order.orderNumber}
                            </span>
                          </Link>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this order?"
                                )
                              ) {
                                setOrders(
                                  orders.filter((o) => o.id !== order.id)
                                );
                              }
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Delete order {order.orderNumber}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">
                    No orders found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredOrders.length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {formatCurrency(
                    filteredOrders.reduce(
                      (sum, order) => sum + order.totalAmount,
                      0
                    ),
                    "USD"
                  )}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Total Value</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredOrders.filter((o) => o.status === "pending").length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Pending Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {
                    filteredOrders.filter((o) => o.status === "in_production")
                      .length
                  }
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">In Production</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
