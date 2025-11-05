"use client";

import { useState, useEffect } from "react";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { MetricCard } from "@/components/reports/ReportsComponents";

// Mock data for recent activity
const mockRecentActivity = [
  {
    id: 1,
    type: "order",
    title: "New order from Acme Corporation",
    description: "Order #ORD-015 for $2,450.00",
    timestamp: "2024-11-05T10:30:00Z",
    status: "completed",
  },
  {
    id: 2,
    type: "invoice",
    title: "Invoice sent to Beta Industries",
    description: "Invoice #INV-018 for $1,250.00",
    timestamp: "2024-11-05T09:15:00Z",
    status: "sent",
  },
  {
    id: 3,
    type: "customer",
    title: "New customer registered",
    description: "Delta Corp joined as business customer",
    timestamp: "2024-11-05T08:45:00Z",
    status: "active",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment received",
    description: "Payment of $3,200.00 from Gamma Solutions",
    timestamp: "2024-11-04T16:20:00Z",
    status: "completed",
  },
];

const mockQuickStats = {
  todayRevenue: 8750.0,
  todayOrders: 12,
  pendingInvoices: 23,
  overdueInvoices: 5,
  revenueChange: 15.3,
  ordersChange: -2.1,
  conversionRate: 24.5,
  avgOrderValue: 728.33,
};

export default function ReportsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [quickStats, setQuickStats] = useState(mockQuickStats);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setQuickStats(mockQuickStats);
        setRecentActivity(mockRecentActivity);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return ShoppingCartIcon;
      case "invoice":
        return DocumentTextIcon;
      case "customer":
        return UserGroupIcon;
      case "payment":
        return CurrencyDollarIcon;
      default:
        return CalendarIcon;
    }
  };

  const getActivityColor = (type: string, status: string) => {
    if (type === "payment" || status === "completed")
      return "text-green-600 bg-green-100";
    if (type === "invoice" || status === "sent")
      return "text-blue-600 bg-blue-100";
    if (type === "customer" || status === "active")
      return "text-purple-600 bg-purple-100";
    return "text-gray-600 bg-gray-100";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Today's Quick Stats */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Today's Performance
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Today's Revenue"
            value={formatCurrency(quickStats.todayRevenue)}
            change={quickStats.revenueChange}
            icon={CurrencyDollarIcon}
            color="green"
          />

          <MetricCard
            title="Today's Orders"
            value={quickStats.todayOrders}
            change={quickStats.ordersChange}
            icon={ShoppingCartIcon}
            color="blue"
          />

          <MetricCard
            title="Avg. Order Value"
            value={formatCurrency(quickStats.avgOrderValue)}
            icon={ArrowTrendingUpIcon}
            color="purple"
          />

          <MetricCard
            title="Conversion Rate"
            value={`${quickStats.conversionRate}%`}
            icon={ArrowTrendingDownIcon}
            color="yellow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Alerts & Notifications */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Alerts & Notifications
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <DocumentTextIcon className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-red-800">
                    {quickStats.overdueInvoices} Overdue Invoices
                  </p>
                  <p className="text-xs text-red-600">
                    Requires immediate attention
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <DocumentTextIcon className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-yellow-800">
                    {quickStats.pendingInvoices} Pending Invoices
                  </p>
                  <p className="text-xs text-yellow-600">
                    Ready to be sent to customers
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-blue-800">
                    Revenue Growth
                  </p>
                  <p className="text-xs text-blue-600">
                    +{quickStats.revenueChange}% compared to yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  const colorClasses = getActivityColor(
                    activity.type,
                    activity.status
                  );

                  return (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {index !== recentActivity.length - 1 && (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${colorClasses}`}
                            >
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {activity.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {activity.description}
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              {formatTimeAgo(activity.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View all activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
