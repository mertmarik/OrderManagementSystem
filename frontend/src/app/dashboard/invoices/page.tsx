"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  DocumentArrowDownIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

// Mock data - replace with actual API calls
const mockInvoices = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2024-001",
    orderId: "ORD-001",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    customerType: "business",
    issueDate: "2024-01-20T10:30:00Z",
    dueDate: "2024-02-19T23:59:59Z",
    paidDate: "2024-02-15T14:30:00Z",
    status: "paid",
    subtotal: 1125.0,
    taxAmount: 112.5,
    total: 1237.5,
    currency: "USD",
    paymentTerms: "Net 30",
    notes: "Thank you for your business!",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-02-15T14:30:00Z",
    items: [
      {
        id: "item-1",
        description: "Custom T-Shirts - Black",
        quantity: 50,
        unitPrice: 15.0,
        total: 750.0,
      },
      {
        id: "item-2",
        description: "Logo Design Service",
        quantity: 1,
        unitPrice: 375.0,
        total: 375.0,
      },
    ],
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2024-002",
    orderId: "ORD-002",
    customerId: "CUST-002",
    customerName: "Beta Industries",
    customerType: "business",
    issueDate: "2024-01-22T09:15:00Z",
    dueDate: "2024-02-21T23:59:59Z",
    paidDate: null,
    status: "sent",
    subtotal: 2000.0,
    taxAmount: 200.0,
    total: 2200.0,
    currency: "USD",
    paymentTerms: "Net 30",
    notes: "Payment due within 30 days.",
    createdAt: "2024-01-22T09:15:00Z",
    updatedAt: "2024-01-22T09:15:00Z",
    items: [
      {
        id: "item-1",
        description: "Industrial Equipment",
        quantity: 2,
        unitPrice: 1000.0,
        total: 2000.0,
      },
    ],
  },
  {
    id: "INV-003",
    invoiceNumber: "INV-2024-003",
    orderId: "ORD-003",
    customerId: "CUST-003",
    customerName: "John Smith",
    customerType: "individual",
    issueDate: "2024-01-25T16:45:00Z",
    dueDate: "2024-02-08T23:59:59Z",
    paidDate: null,
    status: "overdue",
    subtotal: 450.0,
    taxAmount: 45.0,
    total: 495.0,
    currency: "USD",
    paymentTerms: "Net 15",
    notes: "Payment overdue. Please remit immediately.",
    createdAt: "2024-01-25T16:45:00Z",
    updatedAt: "2024-01-25T16:45:00Z",
    items: [
      {
        id: "item-1",
        description: "Promotional Merchandise",
        quantity: 10,
        unitPrice: 45.0,
        total: 450.0,
      },
    ],
  },
  {
    id: "INV-004",
    invoiceNumber: "INV-2024-004",
    orderId: "ORD-004",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    customerType: "business",
    issueDate: "2024-01-28T11:20:00Z",
    dueDate: "2024-02-27T23:59:59Z",
    paidDate: null,
    status: "draft",
    subtotal: 875.0,
    taxAmount: 87.5,
    total: 962.5,
    currency: "USD",
    paymentTerms: "Net 30",
    notes: "Draft invoice - pending review.",
    createdAt: "2024-01-28T11:20:00Z",
    updatedAt: "2024-01-28T11:20:00Z",
    items: [
      {
        id: "item-1",
        description: "Business Cards",
        quantity: 1000,
        unitPrice: 0.875,
        total: 875.0,
      },
    ],
  },
];

const statusConfig = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800",
    icon: DocumentTextIcon,
  },
  sent: { label: "Sent", color: "bg-blue-100 text-blue-800", icon: ClockIcon },
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800",
    icon: CheckCircleIcon,
  },
  overdue: {
    label: "Overdue",
    color: "bg-red-100 text-red-800",
    icon: ExclamationTriangleIcon,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircleIcon,
  },
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  // Filter invoices based on search and filters
  useEffect(() => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoiceNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.total.toString().includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((invoice) => invoice.status === statusFilter);
    }

    if (customerTypeFilter !== "all") {
      filtered = filtered.filter(
        (invoice) => invoice.customerType === customerTypeFilter
      );
    }

    setFilteredInvoices(filtered);
  }, [invoices, searchTerm, statusFilter, customerTypeFilter]);

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedInvoices(
      selectedInvoices.length === filteredInvoices.length
        ? []
        : filteredInvoices.map((invoice) => invoice.id)
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysOverdue = (dueDate: string, status: string) => {
    if (status !== "overdue") return 0;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Simulate PDF download
    console.log("Downloading invoice:", invoiceId);
  };

  const handleSendInvoice = (invoiceId: string) => {
    // Update invoice status to sent
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, status: "sent", updatedAt: new Date().toISOString() }
          : inv
      )
    );
  };

  const calculateTotals = () => {
    const totalAmount = filteredInvoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0
    );
    const paidAmount = filteredInvoices
      .filter((invoice) => invoice.status === "paid")
      .reduce((sum, invoice) => sum + invoice.total, 0);
    const overdueAmount = filteredInvoices
      .filter((invoice) => invoice.status === "overdue")
      .reduce((sum, invoice) => sum + invoice.total, 0);

    return { totalAmount, paidAmount, overdueAmount };
  };

  const totals = calculateTotals();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Invoices
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your invoices, track payments, and monitor outstanding
            balances.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Invoice
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {filteredInvoices.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(totals.totalAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Paid Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(totals.paidAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Overdue Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(totals.overdueAmount)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
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
              placeholder="Search invoices..."
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
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Customer type filter */}
          <select
            value={customerTypeFilter}
            onChange={(e) => setCustomerTypeFilter(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Customers</option>
            <option value="business">Business</option>
            <option value="individual">Individual</option>
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

      {/* Invoices table */}
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
                          selectedInvoices.length === filteredInvoices.length &&
                          filteredInvoices.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Invoice
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
                      Issue Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredInvoices.map((invoice) => {
                    const statusInfo =
                      statusConfig[invoice.status as keyof typeof statusConfig];
                    const StatusIcon = statusInfo.icon;
                    const daysOverdue = getDaysOverdue(
                      invoice.dueDate,
                      invoice.status
                    );

                    return (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="relative px-7 sm:w-12 sm:px-6">
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={() => handleSelectInvoice(invoice.id)}
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-8 w-8 text-gray-400 mr-3" />
                            <div>
                              <Link
                                href={`/dashboard/invoices/${invoice.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                              >
                                {invoice.invoiceNumber}
                              </Link>
                              <div className="text-sm text-gray-500">
                                Order: {invoice.orderId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            {invoice.customerType === "business" ? (
                              <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                            ) : (
                              <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {invoice.customerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {invoice.customerId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                            {formatDate(invoice.issueDate)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              {formatDate(invoice.dueDate)}
                              {daysOverdue > 0 && (
                                <div className="text-xs text-red-600 font-medium">
                                  {daysOverdue} days overdue
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          <div>
                            {formatCurrency(invoice.total)}
                            {invoice.paidDate && (
                              <div className="text-xs text-green-600">
                                Paid {formatDate(invoice.paidDate)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <span
                            className={classNames(
                              "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium",
                              statusInfo.color
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex items-center gap-x-2">
                            <Link
                              href={`/dashboard/invoices/${invoice.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="View invoice"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Link>
                            {invoice.status === "draft" && (
                              <Link
                                href={`/dashboard/invoices/${invoice.id}/edit`}
                                className="text-gray-600 hover:text-gray-900"
                                title="Edit invoice"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </Link>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDownloadInvoice(invoice.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Download PDF"
                            >
                              <DocumentArrowDownIcon className="h-4 w-4" />
                            </button>
                            {invoice.status === "draft" && (
                              <button
                                type="button"
                                onClick={() => handleSendInvoice(invoice.id)}
                                className="text-green-600 hover:text-green-900 text-xs px-2 py-1 rounded border border-green-300 hover:bg-green-50"
                                title="Send invoice"
                              >
                                Send
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredInvoices.length === 0 && (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No invoices found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new invoice.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/dashboard/invoices/new"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                      New Invoice
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
