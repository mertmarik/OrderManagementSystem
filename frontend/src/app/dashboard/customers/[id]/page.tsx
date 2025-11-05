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
  UserIcon,
  CalendarIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

// Mock customer data - replace with actual API call
const mockCustomerData = {
  "CUST-001": {
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
    taxId: "12-3456789",
    notes:
      "Preferred customer with excellent payment history. Always pays on time.",
    contacts: [
      {
        id: "contact-1",
        name: "John Smith",
        title: "Purchasing Manager",
        email: "john@acme.com",
        phone: "+1 (555) 123-4567",
        isPrimary: true,
      },
      {
        id: "contact-2",
        name: "Jane Doe",
        title: "Operations Director",
        email: "jane@acme.com",
        phone: "+1 (555) 123-4568",
        isPrimary: false,
      },
    ],
    recentOrders: [
      {
        id: "ORD-001",
        orderNumber: "ORD-001",
        date: "2024-01-20T14:30:00Z",
        status: "delivered",
        total: 1250.0,
        items: 3,
      },
      {
        id: "ORD-002",
        orderNumber: "ORD-002",
        date: "2024-01-18T09:15:00Z",
        status: "delivered",
        total: 875.5,
        items: 2,
      },
      {
        id: "ORD-003",
        orderNumber: "ORD-003",
        date: "2024-01-15T16:45:00Z",
        status: "delivered",
        total: 2100.75,
        items: 5,
      },
    ],
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const customerId = params.id as string;
        const customerData =
          mockCustomerData[customerId as keyof typeof mockCustomerData];

        if (customerData) {
          setCustomer(customerData);
        } else {
          // Customer not found
          router.push("/dashboard/customers");
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Customer not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            {customer.type === "business" ? (
              <BuildingOfficeIcon className="h-8 w-8 text-gray-400 mr-3" />
            ) : (
              <UserIcon className="h-8 w-8 text-gray-400 mr-3" />
            )}
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {customer.name}
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span
                    className={classNames(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      customer.type === "business"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    )}
                  >
                    {customer.type === "business" ? "Business" : "Individual"}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
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
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                  Customer since {formatDate(customer.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <Link
              href={`/dashboard/customers/${customer.id}/edit`}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              Edit
            </Link>
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Customer Information */}
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
                      href={`mailto:${customer.email}`}
                      className="hover:text-indigo-600"
                    >
                      {customer.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <a
                      href={`tel:${customer.phone}`}
                      className="hover:text-indigo-600"
                    >
                      {customer.phone}
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 flex items-start text-sm text-gray-900">
                    <MapPinIcon className="mr-2 h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <div>{customer.address.street}</div>
                      <div>
                        {customer.address.city}, {customer.address.state}{" "}
                        {customer.address.postalCode}
                      </div>
                      <div>{customer.address.country}</div>
                    </div>
                  </dd>
                </div>
                {customer.taxId && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Tax ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {customer.taxId}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Additional Contacts */}
          {customer.contacts && customer.contacts.length > 0 && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Contacts
                </h3>
                <div className="space-y-4">
                  {customer.contacts.map((contact: any) => (
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
          {customer.notes && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Notes
                </h3>
                <div className="flex">
                  <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-700">{customer.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Orders */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Recent Orders
                </h3>
                <Link
                  href={`/dashboard/orders/new?customer=${customer.id}`}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" />
                  New Order
                </Link>
              </div>

              {customer.recentOrders && customer.recentOrders.length > 0 ? (
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
                      {customer.recentOrders.map((order: any) => {
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
                    No orders found for this customer.
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/dashboard/orders/new?customer=${customer.id}`}
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
          {/* Customer Stats */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Customer Summary
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Orders
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {customer.totalOrders}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Total Spent
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(customer.totalSpent)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Last Order
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(customer.lastOrderDate)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Billing Information
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Payment Terms
                  </dt>
                  <dd className="mt-1 flex items-center text-sm text-gray-900">
                    <CreditCardIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {customer.paymentTerms}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Credit Limit
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatCurrency(customer.creditLimit)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Available Credit
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatCurrency(
                      customer.creditLimit - customer.totalSpent * 0.1
                    )}{" "}
                    {/* Mock calculation */}
                  </dd>
                </div>
              </dl>
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
                  href={`/dashboard/orders/new?customer=${customer.id}`}
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Order
                </Link>
                <Link
                  href={`/dashboard/customers/${customer.id}/edit`}
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit Customer
                </Link>
                <Link
                  href={`/dashboard/orders?customer=${customer.id}`}
                  className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <EyeIcon className="mr-2 h-4 w-4" />
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
