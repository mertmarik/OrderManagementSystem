"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  StarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  TagIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

// Mock supplier data - replace with actual API call
const mockSupplierData = {
  "SUPP-001": {
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
      "Reliable supplier with excellent quality control and fast turnaround times. Consistently delivers on time and maintains high quality standards.",
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
      {
        id: "contact-2",
        name: "Mike Chen",
        title: "Production Manager",
        department: "Manufacturing",
        email: "mike@globalprint.com",
        phone: "+1 (555) 111-2224",
        isPrimary: false,
      },
    ],
    recentOrders: [
      {
        id: "PO-001",
        orderNumber: "PO-001",
        date: "2024-01-22T14:30:00Z",
        status: "delivered",
        total: 3250.0,
        items: 5,
        deliveryDate: "2024-01-25T10:00:00Z",
      },
      {
        id: "PO-002",
        orderNumber: "PO-002",
        date: "2024-01-18T09:15:00Z",
        status: "delivered",
        total: 1875.5,
        items: 3,
        deliveryDate: "2024-01-22T14:30:00Z",
      },
      {
        id: "PO-003",
        orderNumber: "PO-003",
        date: "2024-01-15T16:45:00Z",
        status: "shipped",
        total: 4100.75,
        items: 7,
        expectedDelivery: "2024-01-28T12:00:00Z",
      },
    ],
    performanceMetrics: {
      onTimeDelivery: 94.2,
      qualityRating: 4.7,
      responsiveness: 4.9,
      priceCompetitiveness: 4.5,
    },
  },
};

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: ClockIcon,
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircleIcon,
  },
  processing: {
    label: "Processing",
    color: "bg-indigo-100 text-indigo-800",
    icon: ClockIcon,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800",
    icon: TruckIcon,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    icon: CheckCircleIcon,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800",
    icon: XCircleIcon,
  },
};

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

function PerformanceBar({
  label,
  value,
  color = "indigo",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value}%</span>
      </div>
      <div className="mt-1 bg-gray-200 rounded-full h-2">
        <div
          className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function SupplierDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const supplierId = params.id as string;
        const supplierData =
          mockSupplierData[supplierId as keyof typeof mockSupplierData];

        if (supplierData) {
          setSupplier(supplierData);
        } else {
          // Supplier not found
          router.push("/dashboard/suppliers");
        }
      } catch (error) {
        console.error("Error fetching supplier:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [params.id, router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const togglePreferred = () => {
    setSupplier((prev: any) => ({ ...prev, isPreferred: !prev.isPreferred }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Supplier not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <div className="flex items-center gap-x-3">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {supplier.name}
                </h1>
                {supplier.isPreferred && (
                  <button
                    onClick={togglePreferred}
                    className="text-yellow-400 hover:text-yellow-500"
                    title="Preferred Supplier"
                  >
                    <StarIcon className="h-6 w-6" fill="currentColor" />
                  </button>
                )}
                {supplier.certifications.length > 0 && (
                  <ShieldCheckIcon
                    className="h-6 w-6 text-green-500"
                    title="Certified Supplier"
                  />
                )}
              </div>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
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
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
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
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                  Partner since {formatDate(supplier.createdAt)}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <StarRating rating={supplier.rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <Link
              href={`/dashboard/suppliers/${supplier.id}/edit`}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Edit
            </Link>
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Supplier Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Contact Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <EnvelopeIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <a
                      href={`mailto:${supplier.email}`}
                      className="hover:text-indigo-600"
                    >
                      {supplier.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <a
                      href={`tel:${supplier.phone}`}
                      className="hover:text-indigo-600"
                    >
                      {supplier.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <GlobeAltIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <a
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600"
                    >
                      {supplier.website}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tax ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {supplier.taxId}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 flex items-start text-sm text-gray-900">
                    <MapPinIcon className="mr-2 h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <div>{supplier.address.street}</div>
                      <div>
                        {supplier.address.city}, {supplier.address.state}{" "}
                        {supplier.address.postalCode}
                      </div>
                      <div>{supplier.address.country}</div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Business Terms */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Business Terms
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Payment Terms
                  </dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <CreditCardIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {supplier.paymentTerms}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Minimum Order
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatCurrency(supplier.minimumOrderValue)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Lead Time
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {supplier.leadTime} days
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Categories & Certifications */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Categories & Certifications
              </h3>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Product Categories
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {supplier.categories.map(
                      (category: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800"
                        >
                          <TagIcon className="h-3 w-3" />
                          {category}
                        </span>
                      )
                    )}
                  </dd>
                </div>
                {supplier.certifications.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">
                      Certifications
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {supplier.certifications.map(
                        (cert: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800"
                          >
                            <ShieldCheckIcon className="h-3 w-3" />
                            {cert}
                          </span>
                        )
                      )}
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contacts */}
          {supplier.contacts && supplier.contacts.length > 0 && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Contacts
                </h3>
                <div className="space-y-4">
                  {supplier.contacts.map((contact: any) => (
                    <div
                      key={contact.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-sm font-medium text-gray-900">
                              {contact.name}
                            </h4>
                            {contact.isPrimary && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {contact.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {contact.department}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <EnvelopeIcon className="mr-2 h-4 w-4" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-indigo-600"
                          >
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <PhoneIcon className="mr-2 h-4 w-4" />
                          <a
                            href={`tel:${contact.phone}`}
                            className="hover:text-indigo-600"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {supplier.notes && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Notes
                </h3>
                <div className="flex">
                  <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-700">{supplier.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Orders */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Recent Purchase Orders
                </h3>
                <Link
                  href={`/dashboard/orders/new?supplier=${supplier.id}`}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" />
                  New Order
                </Link>
              </div>

              {supplier.recentOrders && supplier.recentOrders.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                          Total
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {supplier.recentOrders.map((order: any) => {
                        const statusInfo =
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ];
                        const StatusIcon = statusInfo.icon;

                        return (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                href={`/dashboard/orders/${order.id}`}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                {order.orderNumber}
                              </Link>
                              <div className="text-sm text-gray-500">
                                {order.items} items
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {formatDateShort(order.date)}
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
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              {formatCurrency(order.total)}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                              <Link
                                href={`/dashboard/orders/${order.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">
                                  View order {order.orderNumber}
                                </span>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">
                    No orders found for this supplier.
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/dashboard/orders/new?supplier=${supplier.id}`}
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      <PlusIcon className="-ml-0.5 h-5 w-5" />
                      Create First Order
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Supplier Stats */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Supplier Summary
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Orders
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {supplier.totalOrders}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Spend
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(supplier.totalSpent)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Last Order
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(supplier.lastOrderDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Overall Rating
                  </dt>
                  <dd className="mt-1">
                    <StarRating rating={supplier.rating} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="flex items-center text-lg font-medium leading-6 text-gray-900 mb-4">
                <ChartBarIcon className="mr-2 h-5 w-5 text-gray-400" />
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <PerformanceBar
                  label="On-Time Delivery"
                  value={supplier.performanceMetrics.onTimeDelivery}
                  color="green"
                />
                <PerformanceBar
                  label="Quality Rating"
                  value={supplier.performanceMetrics.qualityRating * 20}
                  color="blue"
                />
                <PerformanceBar
                  label="Responsiveness"
                  value={supplier.performanceMetrics.responsiveness * 20}
                  color="purple"
                />
                <PerformanceBar
                  label="Price Competitiveness"
                  value={supplier.performanceMetrics.priceCompetitiveness * 20}
                  color="yellow"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href={`/dashboard/orders/new?supplier=${supplier.id}`}
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Purchase Order
                </Link>
                <Link
                  href={`/dashboard/suppliers/${supplier.id}/edit`}
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit Supplier
                </Link>
                <Link
                  href={`/dashboard/orders?supplier=${supplier.id}`}
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <EyeIcon className="mr-2 h-4 w-4" />
                  View All Orders
                </Link>
                <button
                  onClick={togglePreferred}
                  className={classNames(
                    "flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset",
                    supplier.isPreferred
                      ? "bg-yellow-50 text-yellow-700 ring-yellow-300 hover:bg-yellow-100"
                      : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
                  )}
                >
                  <StarIcon
                    className={classNames(
                      "mr-2 h-4 w-4",
                      supplier.isPreferred ? "text-yellow-400" : "text-gray-400"
                    )}
                  />
                  {supplier.isPreferred
                    ? "Remove from Preferred"
                    : "Mark as Preferred"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
