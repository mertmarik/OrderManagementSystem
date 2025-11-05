"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

// Mock data for form options
const mockCustomers = [
  {
    id: "CUST-001",
    name: "Acme Corporation",
    email: "orders@acme.com",
    type: "business",
  },
  {
    id: "CUST-002",
    name: "Beta Industries",
    email: "procurement@beta.com",
    type: "business",
  },
  {
    id: "CUST-003",
    name: "John Smith",
    email: "john@example.com",
    type: "individual",
  },
];

const mockProducts = [
  {
    id: "PROD-001",
    name: "Custom T-Shirts",
    price: 15.0,
    description: "High-quality custom printed t-shirts",
  },
  {
    id: "PROD-002",
    name: "Business Cards",
    price: 0.1,
    description: "Professional business cards",
  },
  {
    id: "PROD-003",
    name: "Logo Design",
    price: 500.0,
    description: "Professional logo design service",
  },
  {
    id: "PROD-004",
    name: "Promotional Mugs",
    price: 8.5,
    description: "Custom branded ceramic mugs",
  },
];

const paymentTermsOptions = [
  { value: "Net 15", label: "Net 15 - Payment due in 15 days" },
  { value: "Net 30", label: "Net 30 - Payment due in 30 days" },
  { value: "Net 45", label: "Net 45 - Payment due in 45 days" },
  { value: "Net 60", label: "Net 60 - Payment due in 60 days" },
  {
    value: "Due on Receipt",
    label: "Due on Receipt - Payment due immediately",
  },
];

interface InvoiceItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceForm {
  customerId: string;
  customerName: string;
  orderId: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  notes: string;
  items: InvoiceItem[];
  taxRate: number;
  discountAmount: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const [formData, setFormData] = useState<InvoiceForm>({
    customerId: "",
    customerName: "",
    orderId: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentTerms: "Net 30",
    notes: "",
    items: [],
    taxRate: 10, // 10% tax rate
    discountAmount: 0,
  });

  // Calculate due date based on payment terms
  useEffect(() => {
    if (formData.issueDate && formData.paymentTerms) {
      const issueDate = new Date(formData.issueDate);
      let daysToAdd = 30; // default

      switch (formData.paymentTerms) {
        case "Net 15":
          daysToAdd = 15;
          break;
        case "Net 30":
          daysToAdd = 30;
          break;
        case "Net 45":
          daysToAdd = 45;
          break;
        case "Net 60":
          daysToAdd = 60;
          break;
        case "Due on Receipt":
          daysToAdd = 0;
          break;
      }

      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + daysToAdd);

      setFormData((prev) => ({
        ...prev,
        dueDate: dueDate.toISOString().split("T")[0],
      }));
    }
  }, [formData.issueDate, formData.paymentTerms]);

  // Filter customers based on search
  useEffect(() => {
    if (customerSearchTerm) {
      const filtered = mockCustomers.filter(
        (customer) =>
          customer.name
            .toLowerCase()
            .includes(customerSearchTerm.toLowerCase()) ||
          customer.email
            .toLowerCase()
            .includes(customerSearchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(mockCustomers);
    }
  }, [customerSearchTerm]);

  // Filter products based on search
  useEffect(() => {
    if (productSearchTerm) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(productSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(mockProducts);
    }
  }, [productSearchTerm]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomerSelect = (customer: any) => {
    setFormData((prev) => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
    }));
    setCustomerSearchTerm(customer.name);
    setShowCustomerDropdown(false);
  };

  const addInvoiceItem = (product?: any) => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      productId: product?.id || "",
      description: product?.name || "",
      quantity: 1,
      unitPrice: product?.price || 0,
      total: product?.price || 0,
    };

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    setProductSearchTerm("");
    setShowProductDropdown(false);
  };

  const updateInvoiceItem = (
    itemId: string,
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate total when quantity or unit price changes
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }

          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const removeInvoiceItem = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const discountedSubtotal = subtotal - formData.discountAmount;
    const taxAmount = (discountedSubtotal * formData.taxRate) / 100;
    const total = discountedSubtotal + taxAmount;

    return {
      subtotal,
      discountedSubtotal,
      taxAmount,
      total,
    };
  };

  const totals = calculateTotals();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call here
      console.log("Creating invoice:", formData);

      // Redirect to invoices list or invoice detail page
      router.push("/dashboard/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/invoices");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">
          New Invoice
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Create a new invoice for your customer with detailed line items and
          payment terms.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Invoice Details */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Invoice Details
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Customer Selection */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="customer"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Customer *
                </label>
                <div className="relative mt-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      value={customerSearchTerm}
                      onChange={(e) => {
                        setCustomerSearchTerm(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {showCustomerDropdown && filteredCustomers.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          onClick={() => handleCustomerSelect(customer)}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {customer.name}
                            </span>
                          </div>
                          <span className="text-gray-500 absolute inset-y-0 right-0 flex items-center pr-4">
                            {customer.id}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="orderId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Order ID (Optional)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="orderId"
                    id="orderId"
                    value={formData.orderId}
                    onChange={(e) =>
                      handleInputChange("orderId", e.target.value)
                    }
                    placeholder="ORD-001"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="issueDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Issue Date *
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="issueDate"
                      id="issueDate"
                      required
                      value={formData.issueDate}
                      onChange={(e) =>
                        handleInputChange("issueDate", e.target.value)
                      }
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="paymentTerms"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Payment Terms *
                </label>
                <div className="mt-2">
                  <select
                    id="paymentTerms"
                    name="paymentTerms"
                    required
                    value={formData.paymentTerms}
                    onChange={(e) =>
                      handleInputChange("paymentTerms", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {paymentTermsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Due Date *
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="dueDate"
                      id="dueDate"
                      required
                      value={formData.dueDate}
                      onChange={(e) =>
                        handleInputChange("dueDate", e.target.value)
                      }
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Invoice Items
              </h3>
              <div className="flex gap-x-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearchTerm}
                    onChange={(e) => {
                      setProductSearchTerm(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => setShowProductDropdown(true)}
                    className="block w-64 rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {showProductDropdown && filteredProducts.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => addInvoiceItem(product)}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-normal block truncate">
                              {product.name}
                            </span>
                            <span className="text-sm">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {product.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => addInvoiceItem()}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <PlusIcon className="-ml-0.5 h-5 w-5" />
                  Add Item
                </button>
              </div>
            </div>

            {formData.items.length > 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                        Description
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
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {formData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) =>
                              updateInvoiceItem(
                                item.id,
                                "description",
                                e.target.value
                              )
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Item description"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateInvoiceItem(
                                item.id,
                                "quantity",
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateInvoiceItem(
                                  item.id,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="block w-32 rounded-md border-0 py-1.5 pl-8 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => removeInvoiceItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 border border-gray-300 border-dashed rounded-lg">
                <PlusIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No items added
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding items to your invoice.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Totals */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Invoice Totals
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="discountAmount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Amount
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <CurrencyDollarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.discountAmount}
                      onChange={(e) =>
                        handleInputChange(
                          "discountAmount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="taxRate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tax Rate (%)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.taxRate}
                    onChange={(e) =>
                      handleInputChange(
                        "taxRate",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* Totals Summary */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Subtotal:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatCurrency(totals.subtotal)}
                  </dd>
                </div>
                {formData.discountAmount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Discount:</dt>
                    <dd className="text-sm font-medium text-red-600">
                      -{formatCurrency(formData.discountAmount)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">
                    Tax ({formData.taxRate}%):
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatCurrency(totals.taxAmount)}
                  </dd>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <dt className="text-base font-medium text-gray-900">
                    Total:
                  </dt>
                  <dd className="text-base font-bold text-gray-900">
                    {formatCurrency(totals.total)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Notes & Terms
            </h3>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Additional Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Payment instructions, terms and conditions, or any additional information..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.customerId ||
              formData.items.length === 0
            }
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}
