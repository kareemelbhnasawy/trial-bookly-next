"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useSupplierStore } from "@/stores/supplierStore";
import { formatPrice, formatDate } from "@/lib/utils";

export default function SupplierProductsPage() {
  const { products, deleteProduct, updateProduct } = useSupplierStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "out_of_stock"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock" | "created">(
    "created",
  );

  // Get unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return b.price - a.price;
        case "stock":
          return b.stockQuantity - a.stockQuantity;
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  const handleDeleteProduct = (productId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      deleteProduct(productId);
    }
  };

  const handleToggleStatus = (productId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    updateProduct(productId, { status: newStatus as any });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "out_of_stock":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: "متاح",
      inactive: "غير متاح",
      out_of_stock: "نفد المخزون",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "out_of_stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                إدارة المنتجات
              </h1>
              <p className="text-gray-600">
                {products.length} منتج •{" "}
                {products.filter((p) => p.status === "active").length} متاح
              </p>
            </div>

            <Link href="/supplier/products/add">
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج جديد
              </Button>
            </Link>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-rawasy-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {products.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      إجم��لي المنتجات
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {products.filter((p) => p.status === "active").length}
                    </div>
                    <div className="text-sm text-gray-600">منتجات متاحة</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {products.filter((p) => p.stockQuantity <= 10).length}
                    </div>
                    <div className="text-sm text-gray-600">مخزون منخفض</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <XCircle className="h-8 w-8 text-red-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {products.filter((p) => p.status === "inactive").length}
                    </div>
                    <div className="text-sm text-gray-600">غير متاح</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="بحث في المنتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 text-right"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="p-3 border border-gray-300 rounded-md text-right"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">متاح</option>
                  <option value="inactive">غير متاح</option>
                  <option value="out_of_stock">نفد المخزون</option>
                </select>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="p-3 border border-gray-300 rounded-md text-right"
                >
                  <option value="all">جميع الفئات</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-3 border border-gray-300 rounded-md text-right"
                >
                  <option value="created">الأحدث</option>
                  <option value="name">الاسم</option>
                  <option value="price">السعر</option>
                  <option value="stock">المخزون</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Products List */}
          {filteredProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6 space-x-reverse">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {product.nameEn}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                            >
                              {getStatusIcon(product.status)}
                              <span className="mr-1">
                                {getStatusLabel(product.status)}
                              </span>
                            </span>
                            {product.featured && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-rawasy-100 text-rawasy-800">
                                مميز
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">السعر:</span>
                            <div className="font-semibold text-rawasy-600">
                              {formatPrice(product.price)} / {product.unit}
                            </div>
                            {product.originalPrice && (
                              <div className="text-xs text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
                          </div>

                          <div>
                            <span className="text-gray-600">المخزون:</span>
                            <div
                              className={`font-semibold ${
                                product.stockQuantity <= 10
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {product.stockQuantity} {product.unit}
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-600">الفئة:</span>
                            <div className="font-semibold">
                              {product.category}
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-600">
                              تاريخ الإضافة:
                            </span>
                            <div className="font-semibold">
                              {formatDate(product.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-gray-600">
                          <span className="font-medium">المواصفات:</span>
                          <span className="mr-2">
                            {product.specifications.grade} •{" "}
                            {product.specifications.standard}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 flex-shrink-0">
                        <Link href={`/products/${product.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Eye className="h-3 w-3 ml-1" />
                            عرض
                          </Button>
                        </Link>

                        <Link href={`/supplier/products/${product.id}/edit`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Edit className="h-3 w-3 ml-1" />
                            تعديل
                          </Button>
                        </Link>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleToggleStatus(product.id, product.status)
                          }
                          className="w-full"
                        >
                          {product.status === "active"
                            ? "إلغاء تفعيل"
                            : "تفعيل"}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="w-full text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-16 text-center">
                {products.length === 0 ? (
                  <>
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      لا توجد منتجات
                    </h3>
                    <p className="text-gray-600 mb-6">
                      ابدأ بإضافة منتجاتك الأولى لعرضها في المتجر
                    </p>
                    <Link href="/supplier/products/add">
                      <Button>
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة منتج جديد
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-600 mb-6">
                      لم نجد أي منتجات تطابق معايير البحث الخاصة بك
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                      }}
                    >
                      إزالة المرشحات
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
