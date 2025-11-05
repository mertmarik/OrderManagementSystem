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
  BuildingOfficeIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

// Mock data - replace with actual API calls
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Acme Corporation",
    email: "orders@acme.com",
    phone: "+1 (555) 123-4567",
    type: "business",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
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
  },
  {
    id: "CUST-002",
    name: "Beta Industries",
    email: "procurement@beta.com",
    phone: "+1 (555) 234-5678",
    type: "business",
    isActive: true,
    createdAt: "2024-01-10T09:15:00Z",
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
  },
  {
    id: "CUST-003",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 345-6789",
    type: "individual",
    isActive: true,
    createdAt: "2024-01-08T16:20:00Z",
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
  },
  {
    id: "CUST-004",
    name: "Global Tech Solutions",
    email: "orders@globaltech.com",
    phone: "+1 (555) 456-7890",
    type: "business",
    isActive: false,
    createdAt: "2023-12-15T10:00:00Z",
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
  },
];

const typeLabels = {
  business: "Business",
  individual: "Individual",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // Filter customers based on search and filters
  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((customer) => customer.type === typeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) =>
        statusFilter === "active" ? customer.isActive : !customer.isActive
      );
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, typeFilter, statusFilter]);

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === filteredCustomers.length
        ? []
        : filteredCustomers.map((customer) => customer.id)
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

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== customerId));
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Customers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your customer relationships, track orders, and maintain
            contact information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/customers/new"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Customer
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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Types</option>
            <option value="business">Business</option>
            <option value="individual">Individual</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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

      {/* Customers table */}
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
                          selectedCustomers.length ===
                            filteredCustomers.length &&
                          filteredCustomers.length > 0
                        }
                        onChange={handleSelectAll}
                      />
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
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Total Spent
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
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => handleSelectCustomer(customer.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {customer.type === "business" ? (
                              <BuildingOfficeIcon className="h-10 w-10 text-gray-400" />
                            ) : (
                              <UserIcon className="h-10 w-10 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <Link
                              href={`/dashboard/customers/${customer.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                            >
                              {customer.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {customer.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            customer.type === "business"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          )}
                        >
                          {typeLabels[customer.type as keyof typeof typeLabels]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <a
                              href={`mailto:${customer.email}`}
                              className="hover:text-indigo-600"
                            >
                              {customer.email}
                            </a>
                          </div>
                          {customer.phone && (
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <a
                                href={`tel:${customer.phone}`}
                                className="hover:text-indigo-600"
                              >
                                {customer.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div>
                          {customer.address.city}, {customer.address.state}
                        </div>
                        <div className="text-xs text-gray-400">
                          {customer.address.country}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">
                            {customer.totalOrders}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last: {formatDate(customer.lastOrderDate)}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            customer.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {customer.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center gap-x-2">
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">
                              View customer {customer.name}
                            </span>
                          </Link>
                          <Link
                            href={`/dashboard/customers/${customer.id}/edit`}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Edit customer {customer.name}
                            </span>
                          </Link>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Delete customer {customer.name}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCustomers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">
                    No customers found matching your criteria.
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
                  {filteredCustomers.length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredCustomers.filter((c) => c.isActive).length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Active Customers</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {formatCurrency(
                    filteredCustomers.reduce(
                      (sum, customer) => sum + customer.totalSpent,
                      0
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {Math.round(
                    filteredCustomers.reduce(
                      (sum, customer) => sum + customer.totalSpent,
                      0
                    ) / filteredCustomers.length
                  )}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Avg. Customer Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
