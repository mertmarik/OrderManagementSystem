"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BuildingOfficeIcon,
  XMarkIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

// Mock data for form options
const countryOptions = [
  { value: "USA", label: "United States" },
  { value: "CAN", label: "Canada" },
  { value: "MEX", label: "Mexico" },
  { value: "GBR", label: "United Kingdom" },
  { value: "DEU", label: "Germany" },
  { value: "FRA", label: "France" },
  { value: "CHN", label: "China" },
  { value: "IND", label: "India" },
];

const paymentTermsOptions = [
  { value: "Net 15", label: "Net 15" },
  { value: "Net 30", label: "Net 30" },
  { value: "Net 45", label: "Net 45" },
  { value: "Net 60", label: "Net 60" },
  { value: "2/10 Net 30", label: "2/10 Net 30" },
  { value: "COD", label: "Cash on Delivery" },
  { value: "Prepayment", label: "Prepayment Required" },
];

const supplierTypes = [
  {
    value: "manufacturer",
    label: "Manufacturer",
    description: "Direct manufacturer or producer",
  },
  {
    value: "distributor",
    label: "Distributor",
    description: "Regional or authorized distributor",
  },
  {
    value: "importer",
    label: "Importer",
    description: "International import specialist",
  },
  {
    value: "wholesaler",
    label: "Wholesaler",
    description: "Bulk quantity wholesaler",
  },
];

const commonCategories = [
  "Printing & Graphics",
  "Apparel & Textiles",
  "Electronics",
  "Promotional Products",
  "Packaging",
  "Office Supplies",
  "Industrial Equipment",
  "Raw Materials",
  "Components",
  "Software & Licenses",
];

const certificationOptions = [
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "FSC Certified",
  "OEKO-TEX",
  "GOTS",
  "Fair Trade",
  "REACH Compliant",
  "RoHS Compliant",
  "UL Listed",
];

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  isPrimary: boolean;
}

interface SupplierForm {
  name: string;
  type: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentTerms: string;
  taxId: string;
  notes: string;
  categories: string[];
  certifications: string[];
  contacts: Contact[];
  isPreferred: boolean;
  minimumOrderValue: string;
  leadTime: string;
}

export default function NewSupplierPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupplierForm>({
    name: "",
    type: "manufacturer",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      street2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "USA",
    },
    paymentTerms: "Net 30",
    taxId: "",
    notes: "",
    categories: [],
    certifications: [],
    contacts: [],
    isPreferred: false,
    minimumOrderValue: "",
    leadTime: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith("address.")) {
      const addressField = field.replace("address.", "");
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleCertificationToggle = (certification: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter((c) => c !== certification)
        : [...prev.certifications, certification],
    }));
  };

  const addContact = () => {
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      name: "",
      email: "",
      phone: "",
      title: "",
      department: "",
      isPrimary: formData.contacts.length === 0,
    };
    setFormData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, newContact],
    }));
  };

  const updateContact = (
    contactId: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) =>
        contact.id === contactId ? { ...contact, [field]: value } : contact
      ),
    }));
  };

  const removeContact = (contactId: string) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  const setPrimaryContact = (contactId: string) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === contactId,
      })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would make an API call here
      console.log("Creating supplier:", formData);

      // Redirect to suppliers list or supplier detail page
      router.push("/dashboard/suppliers");
    } catch (error) {
      console.error("Error creating supplier:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/suppliers");
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">
          New Supplier
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Add a new supplier to your vendor network with detailed information
          and contacts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Supplier Type */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Supplier Type
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supplierTypes.map((type) => (
                <div
                  key={type.value}
                  className={`relative rounded-lg border p-4 cursor-pointer ${
                    formData.type === type.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleInputChange("type", type.value)}
                >
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {type.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {type.description}
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={() => {}}
                    className="absolute top-4 right-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Basic Information
              </h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPreferred"
                  checked={formData.isPreferred}
                  onChange={(e) =>
                    handleInputChange("isPreferred", e.target.checked)
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="isPreferred"
                  className="ml-2 flex items-center text-sm text-gray-700"
                >
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  Preferred Supplier
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Supplier Name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address *
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Website
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="website"
                    id="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="taxId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tax ID / VAT Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="taxId"
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Address Information
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street Address *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street"
                    id="street"
                    required
                    value={formData.address.street}
                    onChange={(e) =>
                      handleInputChange("address.street", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="street2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Apartment, suite, etc.
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="street2"
                    id="street2"
                    value={formData.address.street2}
                    onChange={(e) =>
                      handleInputChange("address.street2", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    value={formData.address.city}
                    onChange={(e) =>
                      handleInputChange("address.city", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required
                    value={formData.address.state}
                    onChange={(e) =>
                      handleInputChange("address.state", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal Code *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    required
                    value={formData.address.postalCode}
                    onChange={(e) =>
                      handleInputChange("address.postalCode", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country *
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    required
                    value={formData.address.country}
                    onChange={(e) =>
                      handleInputChange("address.country", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {countryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Terms */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Business Terms
            </h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
              <div>
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

              <div>
                <label
                  htmlFor="minimumOrderValue"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Minimum Order Value
                </label>
                <div className="mt-2">
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="minimumOrderValue"
                      id="minimumOrderValue"
                      step="0.01"
                      min="0"
                      value={formData.minimumOrderValue}
                      onChange={(e) =>
                        handleInputChange("minimumOrderValue", e.target.value)
                      }
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="leadTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Lead Time (days)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="leadTime"
                    id="leadTime"
                    min="0"
                    value={formData.leadTime}
                    onChange={(e) =>
                      handleInputChange("leadTime", e.target.value)
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Product Categories
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {commonCategories.map((category) => (
                <label key={category} className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <span className="text-gray-900">{category}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Certifications
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {certificationOptions.map((certification) => (
                <label
                  key={certification}
                  className="relative flex items-start"
                >
                  <div className="flex h-6 items-center">
                    <input
                      type="checkbox"
                      checked={formData.certifications.includes(certification)}
                      onChange={() => handleCertificationToggle(certification)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <span className="text-gray-900">{certification}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contacts
              </h3>
              <button
                type="button"
                onClick={addContact}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" />
                Add Contact
              </button>
            </div>

            <div className="space-y-6">
              {formData.contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Contact {index + 1}
                      {contact.isPrimary && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Primary
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center gap-x-2">
                      {!contact.isPrimary && (
                        <button
                          type="button"
                          onClick={() => setPrimaryContact(contact.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          Set as Primary
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) =>
                            updateContact(contact.id, "name", e.target.value)
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={contact.title}
                          onChange={(e) =>
                            updateContact(contact.id, "title", e.target.value)
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Department
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={contact.department}
                          onChange={(e) =>
                            updateContact(
                              contact.id,
                              "department",
                              e.target.value
                            )
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) =>
                            updateContact(contact.id, "email", e.target.value)
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) =>
                            updateContact(contact.id, "phone", e.target.value)
                          }
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Notes
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
                  placeholder="Any additional information about this supplier, quality notes, special requirements, etc."
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
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Supplier"}
          </button>
        </div>
      </form>
    </div>
  );
}
