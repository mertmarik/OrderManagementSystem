"use client";

import { useState, useEffect } from "react";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  MetricCard,
  ProgressBar,
  StatusBadge,
  ChartContainer,
  SimpleTable,
  FilterBar,
} from "@/components/reports/ReportsComponents";
import ReportsDashboard from "@/components/reports/ReportsDashboard";

// Mock data for reports
const mockReportsData = {
  summary: {
    totalRevenue: 156750.0,
    totalOrders: 89,
    totalCustomers: 34,
    totalInvoices: 67,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    customersGrowth: 15.2,
    invoicesGrowth: 6.7,
  },
  salesByMonth: [
    { month: "Jan", revenue: 12500, orders: 15 },
    { month: "Feb", revenue: 18750, orders: 22 },
    { month: "Mar", revenue: 22100, orders: 18 },
    { month: "Apr", revenue: 19800, orders: 20 },
    { month: "May", revenue: 28500, orders: 25 },
    { month: "Jun", revenue: 31200, orders: 28 },
    { month: "Jul", revenue: 23900, orders: 19 },
  ],
  topCustomers: [
    { id: "CUST-001", name: "Acme Corporation", revenue: 28500, orders: 12 },
    { id: "CUST-002", name: "Beta Industries", revenue: 22100, orders: 8 },
    { id: "CUST-003", name: "Gamma Solutions", revenue: 18750, orders: 6 },
    { id: "CUST-004", name: "Delta Enterprises", revenue: 15600, orders: 9 },
    { id: "CUST-005", name: "Epsilon Corp", revenue: 12800, orders: 5 },
  ],
  ordersByStatus: [
    { status: "completed", count: 45, percentage: 50.6 },
    { status: "processing", count: 23, percentage: 25.8 },
    { status: "pending", count: 12, percentage: 13.5 },
    { status: "cancelled", count: 9, percentage: 10.1 },
  ],
  invoicesByStatus: [
    { status: "paid", count: 34, amount: 89500, percentage: 50.7 },
    { status: "sent", count: 18, amount: 42300, percentage: 26.9 },
    { status: "overdue", count: 9, amount: 18900, percentage: 13.4 },
    { status: "draft", count: 6, amount: 6050, percentage: 9.0 },
  ],
  productPerformance: [
    { name: "Custom T-Shirts", revenue: 45600, orders: 28, margin: 35.5 },
    { name: "Business Cards", revenue: 23400, orders: 45, margin: 42.1 },
    { name: "Logo Design", revenue: 18750, orders: 8, margin: 68.2 },
    { name: "Promotional Mugs", revenue: 15200, orders: 22, margin: 28.7 },
    { name: "Custom Packaging", revenue: 12800, orders: 6, margin: 45.3 },
  ],
};

interface DateRange {
  startDate: string;
  endDate: string;
}

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reportsData, setReportsData] = useState(mockReportsData);
  const [showDashboard, setShowDashboard] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "2024-01-01",
    endDate: "2024-07-31",
  });
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  useEffect(() => {
    // Simulate API call to fetch reports data
    const fetchReportsData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would make an API call here
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setReportsData(mockReportsData);
      } catch (error) {
        console.error("Error fetching reports data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportsData();
  }, [dateRange, selectedPeriod]);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    setDateRange({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });
  };

  const handleExportReport = async () => {
    // Simulate export functionality
    console.log("Exporting report...");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getGrowthIcon = (growth: number) => {
    return null; // Icons are handled by MetricCard component
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0
      ? "text-green-600"
      : growth < 0
      ? "text-red-600"
      : "text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              Reports & Analytics
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Track your business performance with comprehensive reports and
              insights.
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <FilterBar
              onDateRangeChange={(start, end) =>
                setDateRange({ startDate: start, endDate: end })
              }
              onPeriodChange={handlePeriodChange}
              onExport={handleExportReport}
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </div>

        {/* Date range and period filters - now handled by FilterBar */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                showDashboard
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {showDashboard ? "Hide" : "Show"} Dashboard Overview
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      {showDashboard && (
        <div className="mb-8">
          <ReportsDashboard />
        </div>
      )}

      {/* Summary cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(reportsData.summary.totalRevenue)}
            change={reportsData.summary.revenueGrowth}
            icon={CurrencyDollarIcon}
            color="green"
          />

          <MetricCard
            title="Total Orders"
            value={reportsData.summary.totalOrders}
            change={reportsData.summary.ordersGrowth}
            icon={ShoppingCartIcon}
            color="blue"
          />

          <MetricCard
            title="Total Customers"
            value={reportsData.summary.totalCustomers}
            change={reportsData.summary.customersGrowth}
            icon={UserGroupIcon}
            color="purple"
          />

          <MetricCard
            title="Total Invoices"
            value={reportsData.summary.totalInvoices}
            change={reportsData.summary.invoicesGrowth}
            icon={DocumentTextIcon}
            color="yellow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales trend chart */}
        <ChartContainer title="Sales Trend">
          <div className="space-y-4">
            {reportsData.salesByMonth.map((item, index) => (
              <ProgressBar
                key={item.month}
                label={`${item.month} - ${item.orders} orders`}
                value={item.revenue}
                max={Math.max(
                  ...reportsData.salesByMonth.map((d) => d.revenue)
                )}
                color="bg-indigo-500"
                showPercentage={false}
              />
            ))}
          </div>
        </ChartContainer>

        {/* Top customers */}
        <ChartContainer title="Top Customers">
          <div className="space-y-4">
            {reportsData.topCustomers.map((customer, index) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500">{customer.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(customer.revenue)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {customer.orders} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Orders by status */}
        <ChartContainer title="Orders by Status">
          <div className="space-y-4">
            {reportsData.ordersByStatus.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <StatusBadge status={item.status} />
                  <ProgressBar
                    label=""
                    value={item.percentage}
                    max={100}
                    color={
                      item.status === "completed"
                        ? "bg-green-500"
                        : item.status === "processing"
                        ? "bg-blue-500"
                        : item.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                    showPercentage={false}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.count}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatPercentage(item.percentage)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Invoices by status */}
        <ChartContainer title="Invoices by Status">
          <div className="space-y-4">
            {reportsData.invoicesByStatus.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <StatusBadge status={item.status} />
                  <ProgressBar
                    label=""
                    value={item.percentage}
                    max={100}
                    color={
                      item.status === "paid"
                        ? "bg-green-500"
                        : item.status === "sent"
                        ? "bg-blue-500"
                        : item.status === "overdue"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }
                    showPercentage={false}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">
                    {item.count}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Product performance */}
      <div className="mt-6">
        <ChartContainer title="Product Performance">
          <SimpleTable
            headers={["Product", "Revenue", "Orders", "Profit Margin"]}
            data={reportsData.productPerformance.map((product) => ({
              product: product.name,
              revenue: product.revenue,
              orders: product.orders,
              profitmargin: product.margin,
            }))}
            formatters={{
              revenue: (value) => formatCurrency(value),
              profitmargin: (value) => (
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    value > 50
                      ? "bg-green-100 text-green-800"
                      : value > 30
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {formatPercentage(value)}
                </span>
              ),
            }}
          />
        </ChartContainer>
      </div>
    </div>
  );
}
