"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentArrowDownIcon,
  PaperAirplaneIcon,
  PencilIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

// Mock invoice data
const mockInvoiceData = {
  "INV-001": {
    id: "INV-001",
    number: "INV-001",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    customerEmail: "orders@acme.com",
    customerType: "business",
    orderId: "ORD-001",
    status: "sent",
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    paymentTerms: "Net 30",
    notes:
      "Thank you for your business. Payment is due within 30 days of invoice date.",
    items: [
      {
        id: "item-1",
        description: "Custom T-Shirts - Navy Blue with Logo",
        quantity: 100,
        unitPrice: 15.0,
        total: 1500.0,
      },
      {
        id: "item-2",
        description: "Setup Fee for Custom Design",
        quantity: 1,
        unitPrice: 75.0,
        total: 75.0,
      },
    ],
    subtotal: 1575.0,
    discountAmount: 75.0,
    taxRate: 10,
    taxAmount: 150.0,
    total: 1650.0,
    paymentHistory: [
      {
        id: "payment-1",
        date: "2024-01-20",
        amount: 500.0,
        method: "Credit Card",
        reference: "ch_1234567890",
        status: "completed",
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z",
  },
  // Add more mock invoices as needed
};

const statusConfig = {
  draft: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800",
    icon: DocumentDuplicateIcon,
  },
  sent: {
    label: "Sent",
    color: "bg-blue-100 text-blue-800",
    icon: PaperAirplaneIcon,
  },
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
    color: "bg-gray-100 text-gray-800",
    icon: ClockIcon,
  },
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const invoiceId = params.id as string;

  useEffect(() => {
    // Simulate API call to fetch invoice details
    const fetchInvoice = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would make an API call here
        await new Promise((resolve) => setTimeout(resolve, 500));

        const invoiceData =
          mockInvoiceData[invoiceId as keyof typeof mockInvoiceData];
        if (invoiceData) {
          setInvoice(invoiceData);
        } else {
          // Invoice not found, redirect to 404 or invoices list
          router.push("/dashboard/invoices");
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        router.push("/dashboard/invoices");
      } finally {
        setIsLoading(false);
      }
    };

    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId, router]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Simulate PDF generation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Downloading PDF for invoice:", invoiceId);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendInvoice = async () => {
    setIsSending(true);
    try {
      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Sending invoice:", invoiceId);

      // Update invoice status
      setInvoice((prev: any) => ({
        ...prev,
        status: "sent",
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error sending invoice:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    router.push(`/dashboard/invoices/${invoiceId}/edit`);
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
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${config.color}`}
      >
        <IconComponent className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const calculatePaidAmount = () => {
    if (!invoice?.paymentHistory) return 0;
    return invoice.paymentHistory
      .filter((payment: any) => payment.status === "completed")
      .reduce((sum: number, payment: any) => sum + payment.amount, 0);
  };

  const getRemainingBalance = () => {
    return invoice?.total - calculatePaidAmount();
  };

  const isOverdue = () => {
    if (!invoice || invoice.status === "paid") return false;
    return new Date(invoice.dueDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Invoice not found
          </h1>
          <p className="mt-2 text-gray-600">
            The invoice you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const paidAmount = calculatePaidAmount();
  const remainingBalance = getRemainingBalance();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              Invoice {invoice.number}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Created on {formatDate(invoice.createdAt)} • Last updated{" "}
              {formatDate(invoice.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            {getStatusBadge(invoice.status)}
            {isOverdue() && (
              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                <ExclamationTriangleIcon className="h-3 w-3" />
                Overdue
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PrinterIcon className="h-4 w-4" />
            Print
          </button>
          {invoice.status !== "sent" && invoice.status !== "paid" && (
            <button
              onClick={handleSendInvoice}
              disabled={isSending}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
              {isSending ? "Sending..." : "Send Invoice"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main invoice content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice details */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Bill To
                  </h3>
                  <div>
                    <p className="font-medium text-gray-900">
                      {invoice.customerName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoice.customerEmail}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mt-2 ${
                        invoice.customerType === "business"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {invoice.customerType === "business"
                        ? "Business"
                        : "Individual"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Invoice Number
                    </dt>
                    <dd className="text-sm text-gray-900">{invoice.number}</dd>
                  </div>
                  {invoice.orderId && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Related Order
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {invoice.orderId}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Issue Date
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(invoice.issueDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Due Date
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(invoice.dueDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Payment Terms
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {invoice.paymentTerms}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice items */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Items
              </h3>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {invoice.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-900">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-6 flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.subtotal)}
                    </span>
                  </div>
                  {invoice.discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Discount:</span>
                      <span className="text-sm font-medium text-red-600">
                        -{formatCurrency(invoice.discountAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Tax ({invoice.taxRate}%):
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.taxAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-base font-medium text-gray-900">
                      Total:
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Notes
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {invoice.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment status */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Payment Status
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid Amount:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(paidAmount)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-600">Remaining Balance:</span>
                    <span
                      className={`font-bold ${
                        remainingBalance > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {formatCurrency(remainingBalance)}
                    </span>
                  </div>
                </div>

                {/* Payment progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Payment Progress</span>
                    <span>
                      {Math.round((paidAmount / invoice.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (paidAmount / invoice.total) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment history */}
          {invoice.paymentHistory && invoice.paymentHistory.length > 0 && (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Payment History
                </h3>
                <div className="space-y-3">
                  {invoice.paymentHistory.map((payment: any) => (
                    <div key={payment.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(payment.amount)}
                          </p>
                          <p className="text-xs text-gray-600">
                            {payment.method}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(payment.date)}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                      {payment.reference && (
                        <p className="text-xs text-gray-500 mt-1">
                          Ref: {payment.reference}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-x-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                  <CheckCircleIcon className="h-4 w-4" />
                  Mark as Paid
                </button>
                <button className="w-full flex items-center justify-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <DocumentDuplicateIcon className="h-4 w-4" />
                  Duplicate Invoice
                </button>
                <button className="w-full flex items-center justify-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <PaperAirplaneIcon className="h-4 w-4" />
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
