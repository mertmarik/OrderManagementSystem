"use client";

import { useState, useEffect } from "react";
import {
  UserIcon,
  BuildingOfficeIcon,
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  KeyIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Settings sections
const settingSections = [
  { id: "account", name: "Account", icon: UserIcon },
  { id: "business", name: "Business Profile", icon: BuildingOfficeIcon },
  { id: "notifications", name: "Notifications", icon: BellIcon },
  { id: "billing", name: "Billing & Plans", icon: CreditCardIcon },
  { id: "security", name: "Security", icon: ShieldCheckIcon },
  { id: "integrations", name: "Integrations", icon: CogIcon },
  { id: "preferences", name: "Preferences", icon: GlobeAltIcon },
];

// Mock settings data
const mockSettingsData = {
  account: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    role: "Administrator",
    timezone: "America/New_York",
    language: "English (US)",
  },
  business: {
    companyName: "Acme Corporation",
    industry: "Manufacturing",
    website: "https://acmecorp.com",
    taxId: "12-3456789",
    address: {
      street: "123 Business St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    businessHours: {
      monday: { start: "09:00", end: "17:00", enabled: true },
      tuesday: { start: "09:00", end: "17:00", enabled: true },
      wednesday: { start: "09:00", end: "17:00", enabled: true },
      thursday: { start: "09:00", end: "17:00", enabled: true },
      friday: { start: "09:00", end: "17:00", enabled: true },
      saturday: { start: "10:00", end: "14:00", enabled: false },
      sunday: { start: "10:00", end: "14:00", enabled: false },
    },
  },
  notifications: {
    email: {
      orderUpdates: true,
      invoiceReminders: true,
      paymentReceived: true,
      lowStock: false,
      systemUpdates: true,
      marketingEmails: false,
    },
    push: {
      orderUpdates: true,
      invoiceReminders: false,
      paymentReceived: true,
      lowStock: true,
    },
    sms: {
      orderUpdates: false,
      invoiceReminders: true,
      paymentReceived: false,
    },
  },
  billing: {
    currentPlan: "Professional",
    planPrice: "$49/month",
    billingCycle: "monthly",
    nextBilling: "2024-12-05",
    paymentMethod: {
      type: "Credit Card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
    },
    invoiceHistory: [
      { id: "INV-2024-001", date: "2024-11-05", amount: 49.0, status: "paid" },
      { id: "INV-2024-002", date: "2024-10-05", amount: 49.0, status: "paid" },
      { id: "INV-2024-003", date: "2024-09-05", amount: 49.0, status: "paid" },
    ],
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2024-10-15",
    loginSessions: [
      {
        id: 1,
        device: "MacBook Pro",
        location: "New York, NY",
        lastActive: "2024-11-05T10:30:00Z",
        current: true,
      },
      {
        id: 2,
        device: "iPhone 15",
        location: "New York, NY",
        lastActive: "2024-11-04T18:45:00Z",
        current: false,
      },
      {
        id: 3,
        device: "Chrome Browser",
        location: "Boston, MA",
        lastActive: "2024-11-03T14:20:00Z",
        current: false,
      },
    ],
  },
  integrations: {
    connected: [
      {
        id: "hubspot",
        name: "HubSpot CRM",
        status: "connected",
        lastSync: "2024-11-05T08:00:00Z",
      },
      {
        id: "stripe",
        name: "Stripe Payments",
        status: "connected",
        lastSync: "2024-11-05T09:30:00Z",
      },
      {
        id: "quickbooks",
        name: "QuickBooks",
        status: "connected",
        lastSync: "2024-11-04T16:45:00Z",
      },
    ],
    available: [
      {
        id: "slack",
        name: "Slack",
        description: "Get notifications in your Slack workspace",
      },
      {
        id: "mailchimp",
        name: "MailChimp",
        description: "Sync customer data for email marketing",
      },
      {
        id: "zapier",
        name: "Zapier",
        description: "Connect with 3000+ apps and automate workflows",
      },
    ],
  },
  preferences: {
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12-hour",
    numberFormat: "US",
    defaultTaxRate: 10,
    invoicePrefix: "INV-",
    orderPrefix: "ORD-",
    autoSaveInterval: 30,
    compactMode: false,
    darkMode: false,
  },
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [settings, setSettings] = useState(mockSettingsData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (section: string, path: string, value: any) => {
    setSettings((prev) => {
      const newSettings = { ...prev };
      const keys = path.split(".");
      let current = newSettings[section as keyof typeof newSettings] as any;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Profile Information
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your account profile information and email address.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <div className="mt-1 flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={settings.account.avatar}
              alt="Profile"
            />
            <button
              type="button"
              className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Change
            </button>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={settings.account.firstName}
              onChange={(e) =>
                updateSetting("account", "firstName", e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={settings.account.lastName}
              onChange={(e) =>
                updateSetting("account", "lastName", e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              value={settings.account.email}
              onChange={(e) =>
                updateSetting("account", "email", e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone number
          </label>
          <div className="mt-1">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={settings.account.phone}
              onChange={(e) =>
                updateSetting("account", "phone", e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700"
          >
            Timezone
          </label>
          <div className="mt-1">
            <select
              id="timezone"
              name="timezone"
              value={settings.account.timezone}
              onChange={(e) =>
                updateSetting("account", "timezone", e.target.value)
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return renderAccountSettings();
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              {settingSections.find((s) => s.id === activeSection)?.name}{" "}
              Settings
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              This section is coming soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">
          Settings
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your account settings and configure your OMS preferences.
        </p>
      </div>

      {/* Success message */}
      {showSuccessMessage && (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Settings saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar navigation */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {settingSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeSection === section.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-6">{renderContent()}</div>

            {/* Save button */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
