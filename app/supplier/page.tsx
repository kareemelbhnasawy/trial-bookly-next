"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Eye,
  Plus,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  useSupplierStore,
  initializeSampleSupplierData,
} from "@/stores/supplierStore";
import { formatPrice, formatDate } from "@/lib/utils";

export default function SupplierDashboard() {
  const { profile, products, orders, getOrderStats, getSalesStats } =
    useSupplierStore();

  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize sample data on first load
  useEffect(() => {
    if (!profile && !isInitialized) {
      initializeSampleSupplierData();
      setIsInitialized(true);
    }
  }, [profile, isInitialized]);

  const orderStats = getOrderStats();
  const salesStats = getSalesStats();

  const recentOrders = orders
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const lowStockProducts = products
    .filter((p) => p.stockQuantity <= 10 && p.status === "active")
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "accepted":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: "طلب جديد",
      accepted: "مقبول",
      processing: "قيد التحضير",
      shipped: "تم الشحن",
      delivered: "تم التسليم",
      cancelled: "ملغي",
    };
    return labels[status] || status;
  };

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              جاري تحميل لوحة التحكم...
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  لوحة التحكم - المورد
                </h1>
                <p className="text-gray-600">
                  مرحباً {profile.contactPerson} - {profile.companyName}
                </p>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex items-center bg-green-50 text-green-800 px-3 py-2 rounded-lg">
                  <CheckCircle className="h-4 w-4 ml-1" />
                  <span className="text-sm font-medium">موثق</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium mr-1">{profile.rating}</span>
                  <span className="text-sm text-gray-600">
                    ({profile.reviewCount} تقييم)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-rawasy-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(salesStats.totalRevenue)}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي المبيعات</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {orderStats.total}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-green-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {products.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      المنتجات المتاحة
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(salesStats.averageOrderValue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      متوسط قيمة الطلب
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    الطلبات الحديثة
                  </CardTitle>
                  <Link href="/supplier/orders">
                    <Button variant="outline" size="sm">
                      عرض الكل
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">
                                طلب #{order.orderNumber}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                              >
                                {getStatusLabel(order.status)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <div>العميل: {order.customerName}</div>
                              <div>التاريخ: {formatDate(order.createdAt)}</div>
                            </div>
                          </div>
                          <div className="text-left ml-4">
                            <div className="font-bold text-rawasy-600">
                              {formatPrice(order.total)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {order.items.length} منتج
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">لا توجد طلبات حديثة</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 ml-2" />
                    المنتجات الأكثر مبيعاً
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {salesStats.topProducts.length > 0 ? (
                    <div className="space-y-4">
                      {salesStats.topProducts.map((product, index) => (
                        <div
                          key={product.productId}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-rawasy-100 text-rawasy-600 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="mr-3">
                              <div className="font-medium text-gray-900">
                                {product.productName}
                              </div>
                              <div className="text-sm text-gray-600">
                                {product.quantity} وحدة مباعة
                              </div>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              {formatPrice(product.revenue)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">لا توجد بيانات مبيعات</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/supplier/products/add">
                    <Button className="w-full justify-start">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة منتج جديد
                    </Button>
                  </Link>

                  <Link href="/supplier/orders">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض الطلبات
                    </Button>
                  </Link>

                  <Link href="/supplier/products">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="h-4 w-4 ml-2" />
                      إدارة المنتجات
                    </Button>
                  </Link>

                  <Link href="/supplier/analytics">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 ml-2" />
                      التقار��ر والتحليلات
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Order Status Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 ml-2" />
                    حالة الطلبات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">طلبات جديدة</span>
                    <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {orderStats.new}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">قيد المعالجة</span>
                    <span className="font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {orderStats.processing}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">تم الشحن</span>
                    <span className="font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {orderStats.shipped}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">تم التسليم</span>
                    <span className="font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {orderStats.delivered}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Low Stock Alert */}
              {lowStockProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-yellow-600">
                      <AlertCircle className="h-5 w-5 ml-2" />
                      تنبيه المخزون المنخفض
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lowStockProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {product.stockQuantity} {product.unit} متبقي
                            </div>
                          </div>
                          <Link href={`/supplier/products/${product.id}/edit`}>
                            <Button size="sm" variant="outline">
                              تحديث
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات الشركة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">الموقع:</span>
                    <span className="mr-2 font-medium">{profile.city}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">التخصص:</span>
                    <span className="mr-2 font-medium">
                      {profile.categories.join("، ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">عضو منذ:</span>
                    <span className="mr-2 font-medium">
                      {formatDate(profile.createdAt)}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link href="/supplier/profile">
                      <Button size="sm" variant="outline" className="w-full">
                        تحديث الملف التجاري
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
