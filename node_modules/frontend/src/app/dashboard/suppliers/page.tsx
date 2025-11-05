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
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  StarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

// Mock data - replace with actual API calls
const mockSuppliers = [
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
  },
];

const typeLabels = {
  manufacturer: "Manufacturer",
  distributor: "Distributor",
  importer: "Importer",
  wholesaler: "Wholesaler",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={classNames(
            star <= rating ? "text-yellow-400" : "text-gray-300",
            "h-4 w-4"
          )}
          fill={star <= rating ? "currentColor" : "none"}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [preferredFilter, setPreferredFilter] = useState("all");
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  // Filter suppliers based on search and filters
  useEffect(() => {
    let filtered = suppliers;

    if (searchTerm) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.categories.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          supplier.address.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((supplier) => supplier.type === typeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((supplier) =>
        statusFilter === "active" ? supplier.isActive : !supplier.isActive
      );
    }

    if (preferredFilter !== "all") {
      filtered = filtered.filter((supplier) =>
        preferredFilter === "preferred"
          ? supplier.isPreferred
          : !supplier.isPreferred
      );
    }

    setFilteredSuppliers(filtered);
  }, [suppliers, searchTerm, typeFilter, statusFilter, preferredFilter]);

  const handleSelectSupplier = (supplierId: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(supplierId)
        ? prev.filter((id) => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSuppliers(
      selectedSuppliers.length === filteredSuppliers.length
        ? []
        : filteredSuppliers.map((supplier) => supplier.id)
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

  const handleDeleteSupplier = (supplierId: string) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter((s) => s.id !== supplierId));
    }
  };

  const togglePreferred = (supplierId: string) => {
    setSuppliers(
      suppliers.map((s) =>
        s.id === supplierId ? { ...s, isPreferred: !s.isPreferred } : s
      )
    );
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            Suppliers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your supplier relationships, track performance, and maintain
            vendor information.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/suppliers/new"
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            New Supplier
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
              placeholder="Search suppliers..."
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
            <option value="manufacturer">Manufacturer</option>
            <option value="distributor">Distributor</option>
            <option value="importer">Importer</option>
            <option value="wholesaler">Wholesaler</option>
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

          {/* Preferred filter */}
          <select
            value={preferredFilter}
            onChange={(e) => setPreferredFilter(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Suppliers</option>
            <option value="preferred">Preferred</option>
            <option value="standard">Standard</option>
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

      {/* Suppliers table */}
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
                          selectedSuppliers.length ===
                            filteredSuppliers.length &&
                          filteredSuppliers.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Supplier
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
                      Categories
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
                      Rating
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
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={selectedSuppliers.includes(supplier.id)}
                          onChange={() => handleSelectSupplier(supplier.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <BuildingOfficeIcon className="h-10 w-10 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center gap-x-2">
                              <Link
                                href={`/dashboard/suppliers/${supplier.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                              >
                                {supplier.name}
                              </Link>
                              {supplier.isPreferred && (
                                <button
                                  onClick={() => togglePreferred(supplier.id)}
                                  className="text-yellow-400 hover:text-yellow-500"
                                  title="Preferred Supplier"
                                >
                                  <StarIcon
                                    className="h-4 w-4"
                                    fill="currentColor"
                                  />
                                </button>
                              )}
                              {supplier.certifications.length > 0 && (
                                <ShieldCheckIcon
                                  className="h-4 w-4 text-green-500"
                                  title="Certified"
                                />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {supplier.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            supplier.type === "manufacturer"
                              ? "bg-blue-100 text-blue-800"
                              : supplier.type === "distributor"
                              ? "bg-green-100 text-green-800"
                              : supplier.type === "importer"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          {typeLabels[supplier.type as keyof typeof typeLabels]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <a
                              href={`mailto:${supplier.email}`}
                              className="hover:text-indigo-600 truncate"
                            >
                              {supplier.email}
                            </a>
                          </div>
                          {supplier.phone && (
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <a
                                href={`tel:${supplier.phone}`}
                                className="hover:text-indigo-600"
                              >
                                {supplier.phone}
                              </a>
                            </div>
                          )}
                          {supplier.website && (
                            <div className="flex items-center">
                              <GlobeAltIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <a
                                href={supplier.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-600 truncate"
                              >
                                Website
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div>
                          {supplier.address.city}, {supplier.address.state}
                        </div>
                        <div className="text-xs text-gray-400">
                          {supplier.address.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-40">
                          <div className="flex flex-wrap gap-1">
                            {supplier.categories
                              .slice(0, 2)
                              .map((category, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
                                >
                                  {category}
                                </span>
                              ))}
                            {supplier.categories.length > 2 && (
                              <span className="text-xs text-gray-400">
                                +{supplier.categories.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">
                            {supplier.totalOrders}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatCurrency(supplier.totalSpent)}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <StarRating rating={supplier.rating} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-x-2">
                          <span
                            className={classNames(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              supplier.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            )}
                          >
                            {supplier.isActive ? "Active" : "Inactive"}
                          </span>
                          {!supplier.isActive && (
                            <ExclamationTriangleIcon
                              className="h-4 w-4 text-amber-500"
                              title="Attention Required"
                            />
                          )}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center gap-x-2">
                          <Link
                            href={`/dashboard/suppliers/${supplier.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">
                              View supplier {supplier.name}
                            </span>
                          </Link>
                          <Link
                            href={`/dashboard/suppliers/${supplier.id}/edit`}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Edit supplier {supplier.name}
                            </span>
                          </Link>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteSupplier(supplier.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">
                              Delete supplier {supplier.name}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSuppliers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">
                    No suppliers found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-5">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredSuppliers.length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Total Suppliers</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredSuppliers.filter((s) => s.isActive).length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Active Suppliers</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredSuppliers.filter((s) => s.isPreferred).length}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Preferred Suppliers</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {formatCurrency(
                    filteredSuppliers.reduce(
                      (sum, supplier) => sum + supplier.totalSpent,
                      0
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Total Spend</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900">
                  {filteredSuppliers.length > 0
                    ? (
                        filteredSuppliers.reduce(
                          (sum, supplier) => sum + supplier.rating,
                          0
                        ) / filteredSuppliers.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
