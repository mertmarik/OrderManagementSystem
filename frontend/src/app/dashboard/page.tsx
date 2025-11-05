"use client";

import {
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TruckIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Total Orders",
    stat: "1,247",
    change: "+12%",
    changeType: "increase",
    icon: ShoppingCartIcon,
  },
  {
    name: "Active Customers",
    stat: "456",
    change: "+5%",
    changeType: "increase",
    icon: UserGroupIcon,
  },
  {
    name: "Monthly Revenue",
    stat: "$89,432",
    change: "+18%",
    changeType: "increase",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Pending Orders",
    stat: "23",
    change: "-3%",
    changeType: "decrease",
    icon: TruckIcon,
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Acme Corp",
    status: "Confirmed",
    total: "$2,450",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Beta Industries",
    status: "In Production",
    total: "$1,280",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Gamma LLC",
    status: "Shipped",
    total: "$3,890",
    date: "2024-01-13",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "Order",
    message: "New order #ORD-004 received from Delta Corp",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "Payment",
    message: "Payment received for invoice #INV-123",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "Shipment",
    message: "Order #ORD-001 has been shipped",
    time: "6 hours ago",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dashboard
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Export
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Order
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.name}
                className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
              >
                <dt>
                  <div className="absolute bg-indigo-500 rounded-md p-3">
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                  <p
                    className={classNames(
                      item.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600",
                      "ml-2 flex items-baseline text-sm font-semibold"
                    )}
                  >
                    {item.change}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Recent orders and activities */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Orders
              </h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <li key={order.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.id} - {order.customer}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.date}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span
                              className={classNames(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                order.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "In Production"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              )}
                            >
                              {order.status}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {order.total}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Activities
              </h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentActivities.map((activity) => (
                      <li key={activity.id} className="py-4">
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <BellIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-800">
                              {activity.message}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
