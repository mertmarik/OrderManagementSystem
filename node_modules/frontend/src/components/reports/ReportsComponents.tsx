"use client";

import { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<any>;
  color?: "blue" | "green" | "red" | "yellow" | "purple";
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color = "blue",
}: MetricCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
  };

  const getChangeColor = (changeValue: number) => {
    return changeValue > 0
      ? "text-green-600"
      : changeValue < 0
      ? "text-red-600"
      : "text-gray-600";
  };

  const getChangeIcon = (changeValue: number) => {
    if (changeValue > 0) {
      return <ArrowUpIcon className="h-3 w-3" />;
    } else if (changeValue < 0) {
      return <ArrowDownIcon className="h-3 w-3" />;
    }
    return null;
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`inline-flex items-center justify-center p-3 rounded-lg ${colorClasses[color]}`}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {change !== undefined && (
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor(
                      change
                    )}`}
                  >
                    {getChangeIcon(change)}
                    <span className="sr-only">
                      {change > 0 ? "Increased" : "Decreased"} by
                    </span>
                    {Math.abs(change).toFixed(1)}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  label,
  value,
  max,
  color = "bg-blue-500",
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm text-gray-500">
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        <span>{typeof max === "number" ? max.toLocaleString() : max}</span>
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
  count?: number;
  variant?: "default" | "pill";
}

export function StatusBadge({
  status,
  count,
  variant = "default",
}: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "processing":
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "pending":
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const baseClasses =
    variant === "pill"
      ? "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      : "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium";

  return (
    <span className={`${baseClasses} ${getStatusColor(status)}`}>
      <span className="capitalize">{status}</span>
      {count !== undefined && <span className="ml-1">({count})</span>}
    </span>
  );
}

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  actions,
  className = "",
}: ChartContainerProps) {
  return (
    <div
      className={`bg-white shadow-sm rounded-lg border border-gray-200 ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {actions && (
            <div className="flex items-center space-x-2">{actions}</div>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

interface SimpleTableProps {
  headers: string[];
  data: Array<Record<string, any>>;
  formatters?: Record<string, (value: any) => React.ReactNode>;
}

export function SimpleTable({
  headers,
  data,
  formatters = {},
}: SimpleTableProps) {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {headers.map((header) => {
                const key = header.toLowerCase().replace(/\s+/g, "");
                const value = row[key] || row[header] || "";
                const formatter = formatters[key] || formatters[header];

                return (
                  <td
                    key={header}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {formatter ? formatter(value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface FilterBarProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  onPeriodChange: (period: string) => void;
  onExport: () => void;
  startDate: string;
  endDate: string;
  selectedPeriod: string;
}

export function FilterBar({
  onDateRangeChange,
  onPeriodChange,
  onExport,
  startDate,
  endDate,
  selectedPeriod,
}: FilterBarProps) {
  const periods = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-400" />
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700"
          >
            From:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => onDateRangeChange(e.target.value, endDate)}
            className="rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-x-2">
          <label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-700"
          >
            To:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => onDateRangeChange(startDate, e.target.value)}
            className="rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex rounded-md shadow-sm">
          {periods.map((period, index) => (
            <button
              key={period.value}
              onClick={() => onPeriodChange(period.value)}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold border border-gray-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                index === 0 ? "rounded-l-md" : ""
              } ${index === periods.length - 1 ? "rounded-r-md" : ""} ${
                selectedPeriod === period.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-x-2">
          <button
            onClick={onExport}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PrinterIcon className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
