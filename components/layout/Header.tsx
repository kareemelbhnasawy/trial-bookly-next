"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Building2,
  MapPin,
  Phone,
  ChevronDown,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const categories = [
  { name: "حديد وصلب", href: "/categories/steel" },
  { name: "اسمنت", href: "/categories/cement" },
  { name: "ركام ورمل", href: "/categories/aggregates" },
  { name: "طوب وبلوك", href: "/categories/masonry" },
  { name: "سباكة", href: "/categories/plumbing" },
  { name: "كهرباء", href: "/categories/electrical" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-rawasy-50 border-b border-rawasy-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center text-rawasy-700">
                <Phone className="h-4 w-4 ml-1" />
                <span>+20 2 123 4567</span>
              </div>
              <div className="flex items-center text-rawasy-700">
                <MapPin className="h-4 w-4 ml-1" />
                <span>توصيل مجاني للطلبات أكثر من 2000 جنيه</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <button className="flex items-center text-rawasy-700 hover:text-rawasy-800">
                <Globe className="h-4 w-4 ml-1" />
                <span>العربية</span>
              </button>
              <span className="text-gray-300">|</span>
              <Link
                href="/suppliers/register"
                className="text-rawasy-700 hover:text-rawasy-800"
              >
                انضم كمورد
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Building2 className="h-8 w-8 text-rawasy-600 ml-2" />
            <div>
              <h1 className="text-2xl font-bold text-rawasy-600">رواسي</h1>
              <p className="text-xs text-gray-500 -mt-1">مواد البناء</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن مواد البناء..."
                className="w-full pl-12 pr-4 py-3 text-right"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button
                className="absolute left-0 top-0 h-full px-6 rounded-r-none"
                type="submit"
              >
                بحث
              </Button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-rawasy-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <User className="h-5 w-5" />
                <span>حسابي</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      إنشاء حساب
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      طلباتي
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      الملف الشخصي
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse py-3">
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-rawasy-600 font-medium"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                الفئات
                <ChevronDown className="mr-1 h-4 w-4" />
              </button>

              {isCategoriesOpen && (
                <div
                  className="absolute top-full right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rawasy-50 hover:text-rawasy-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/suppliers"
              className="text-gray-700 hover:text-rawasy-600 font-medium"
            >
              الموردون
            </Link>
            <Link
              href="/projects"
              className="text-gray-700 hover:text-rawasy-600 font-medium"
            >
              المشاريع
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-rawasy-600 font-medium"
            >
              العروض
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-rawasy-600 font-medium"
            >
              من نحن
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-rawasy-600 font-medium"
            >
              اتصل بنا
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rawasy-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2">
              <Link
                href="/suppliers"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rawasy-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الموردون
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rawasy-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                العروض
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
