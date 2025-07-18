import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatting utilities
export function formatPrice(price: number, currency: string = "SAR"): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ar-SA").format(num);
}

// Date formatting
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

// Text utilities
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Saudi/GCC phone number validation
  const phoneRegex = /^(\+966|966|0)?[5-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// URL utilities
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Cart utilities
export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
): number {
  return originalPrice * (discountPercent / 100);
}

export function calculateBulkDiscount(quantity: number, price: number): number {
  // Progressive bulk discount
  if (quantity >= 100) return price * 0.15; // 15% discount for 100+ items
  if (quantity >= 50) return price * 0.1; // 10% discount for 50+ items
  if (quantity >= 20) return price * 0.05; // 5% discount for 20+ items
  return 0;
}

// Search utilities
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// File utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Color utilities
export function getRandomColor(): string {
  const colors = [
    "bg-red-100 text-red-800",
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Delivery time calculator
export function calculateDeliveryTime(distance: number): string {
  // Basic delivery time calculation (simplified)
  if (distance <= 10) return "2-4 ساعات";
  if (distance <= 50) return "نفس اليوم";
  if (distance <= 200) return "1-2 أيام";
  return "3-5 أيام";
}

// Stock status
export function getStockStatus(quantity: number): {
  status: "in-stock" | "low-stock" | "out-of-stock";
  label: string;
  color: string;
} {
  if (quantity === 0) {
    return {
      status: "out-of-stock",
      label: "غير متوفر",
      color: "text-red-600",
    };
  } else if (quantity <= 10) {
    return {
      status: "low-stock",
      label: "كمية محدودة",
      color: "text-yellow-600",
    };
  } else {
    return {
      status: "in-stock",
      label: "متوفر",
      color: "text-green-600",
    };
  }
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `RWS${timestamp}${random}`;
}
