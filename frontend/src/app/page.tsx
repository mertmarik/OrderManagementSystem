import Link from "next/link";
import {
  ShoppingCartIcon,
  UserGroupIcon,
  TruckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const features = [
    {
      title: "Order Processing",
      description:
        "Manage sales orders, purchase orders, invoicing, and production tracking",
      icon: ShoppingCartIcon,
      href: "/orders",
    },
    {
      title: "Customer Management",
      description:
        "Comprehensive CRM with HubSpot integration and customer portals",
      icon: UserGroupIcon,
      href: "/customers",
    },
    {
      title: "Supplier Management",
      description: "Integration with ESP, SAGE, Distributor Central",
      icon: TruckIcon,
      href: "/suppliers",
    },
    {
      title: "Analytics & Reports",
      description: "Real-time dashboards and custom business reports",
      icon: ChartBarIcon,
      href: "/reports",
    },
    {
      title: "Invoicing",
      description: "Automated invoicing with Stripe and QuickBooks integration",
      icon: DocumentTextIcon,
      href: "/invoices",
    },
    {
      title: "Automation",
      description: "Automate confirmations, approvals, and workflow triggers",
      icon: CogIcon,
      href: "/automation",
    },
    {
      title: "Notifications",
      description: "Real-time alerts and Slack integration",
      icon: BellIcon,
      href: "/notifications",
    },
    {
      title: "AI Knowledge Base",
      description: "Intelligent business insights and recommendations",
      icon: ClipboardDocumentListIcon,
      href: "/knowledge-base",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Order Management System
              </h1>
              <p className="mt-2 text-gray-600">
                Comprehensive business automation platform
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Streamline Your Business Operations
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Comprehensive order management, customer relations, supplier
            integration, and business automation in one powerful platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                System Capabilities
              </h3>
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Integration Partners
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    10+
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Automation Workflows
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    25+
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Real-time Updates
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    24/7
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
