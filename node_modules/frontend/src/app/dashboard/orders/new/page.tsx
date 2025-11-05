"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: Record<string, any>;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  type: "individual" | "business";
}

interface Product {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  stockQuantity: number;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "orders@acme.com",
    type: "business",
  },
  {
    id: "2",
    name: "Beta Industries",
    email: "procurement@beta.com",
    type: "business",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    type: "individual",
  },
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Custom T-Shirts",
    sku: "TS-001",
    unitPrice: 24.5,
    stockQuantity: 500,
  },
  {
    id: "2",
    name: "Business Cards",
    sku: "BC-001",
    unitPrice: 0.25,
    stockQuantity: 10000,
  },
  {
    id: "3",
    name: "Promotional Banners",
    sku: "PB-001",
    unitPrice: 194.5,
    stockQuantity: 25,
  },
  {
    id: "4",
    name: "Letterheads",
    sku: "LH-001",
    unitPrice: 0.15,
    stockQuantity: 5000,
  },
];

export default function NewOrderPage() {
  const router = useRouter();
  const [orderType, setOrderType] = useState<"sales_order" | "purchase_order">(
    "sales_order"
  );
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const addOrderItem = (product: Product) => {
    const existingItem = orderItems.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      setOrderItems((items) =>
        items.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.unitPrice,
              }
            : item
        )
      );
    } else {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: 1,
        unitPrice: product.unitPrice,
        totalPrice: product.unitPrice,
      };
      setOrderItems((items) => [...items, newItem]);
    }

    setProductSearch("");
    setShowProductDropdown(false);
  };

  const updateOrderItem = (
    itemId: string,
    field: "quantity" | "unitPrice",
    value: number
  ) => {
    setOrderItems((items) =>
      items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeOrderItem = (itemId: string) => {
    setOrderItems((items) => items.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomer || orderItems.length === 0) {
      alert("Please select a customer and add at least one item.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual implementation
      const orderData = {
        type: orderType,
        customerId: selectedCustomer.id,
        items: orderItems,
        dueDate,
        notes,
        totalAmount: calculateTotal(),
        currency: "USD",
      };

      console.log("Creating order:", orderData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to orders list
      router.push("/dashboard/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
          Create New Order
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Order Type and Customer Selection */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Information
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Order Type */}
              <div>
                <label
                  htmlFor="orderType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Order Type
                </label>
                <select
                  id="orderType"
                  value={orderType}
                  onChange={(e) =>
                    setOrderType(
                      e.target.value as "sales_order" | "purchase_order"
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="sales_order">Sales Order</option>
                  <option value="purchase_order">Purchase Order</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Customer Selection */}
            <div className="mt-6">
              <label
                htmlFor="customer"
                className="block text-sm font-medium text-gray-700"
              >
                Customer
              </label>
              <div className="relative mt-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={
                      selectedCustomer ? selectedCustomer.name : customerSearch
                    }
                    onChange={(e) => {
                      if (selectedCustomer) {
                        setSelectedCustomer(null);
                      }
                      setCustomerSearch(e.target.value);
                      setShowCustomerDropdown(true);
                    }}
                    onFocus={() => setShowCustomerDropdown(true)}
                    className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {showCustomerDropdown && !selectedCustomer && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                    {filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowCustomerDropdown(false);
                          setCustomerSearch("");
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.email}
                        </div>
                      </button>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No customers found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>

              {/* Add Product */}
              <div className="relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products to add..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => setShowProductDropdown(true)}
                    className="block w-64 rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {showProductDropdown && productSearch && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addOrderItem(product)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.sku} • ${product.unitPrice} • Stock:{" "}
                          {product.stockQuantity}
                        </div>
                      </button>
                    ))}
                    {filteredProducts.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            {orderItems.length > 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
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
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.sku}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateOrderItem(
                                item.id,
                                "quantity",
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-20 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateOrderItem(
                                item.id,
                                "unitPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${item.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => removeOrderItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>
                  No items added yet. Search and select products to add to this
                  order.
                </p>
              </div>
            )}

            {/* Order Totals */}
            {orderItems.length > 0 && (
              <div className="mt-6 flex justify-end">
                <div className="w-80">
                  <dl className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Subtotal:</dt>
                      <dd className="text-gray-900">
                        ${calculateSubtotal().toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-gray-600">Tax (8%):</dt>
                      <dd className="text-gray-900">
                        ${calculateTax().toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-medium">
                      <dt className="text-gray-900">Total:</dt>
                      <dd className="text-gray-900">
                        ${calculateTotal().toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Additional Information
            </h2>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes or special instructions..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-x-3">
          <Link
            href="/dashboard/orders"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={
              isSubmitting || !selectedCustomer || orderItems.length === 0
            }
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
