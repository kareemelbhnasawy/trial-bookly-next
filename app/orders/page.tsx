"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  useOrderStore,
  getStatusLabel,
  type OrderStatus,
} from "@/stores/orderStore";
import { formatPrice, formatDate } from "@/lib/utils";

export default function OrdersPage() {
  const { orders, getOrderStats } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "total">("newest");

  const stats = getOrderStats();

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "processing":
      case "ready_for_dispatch":
      case "in_transit":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "delivered":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
      case "returned":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
      case "ready_for_dispatch":
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
      case "returned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "total":
          return b.total - a.total;
        default:
          return 0;
      }
    });

  if (orders.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />

        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                لا توجد طلبات
              </h1>
              <p className="text-gray-600 mb-8">
                لم تقم بإجراء أي طلبات بعد. ابدأ بتصفح منتج��تنا وإضافتها إلى
                السلة
              </p>
              <Link href="/categories">
                <Button size="lg">تصفح المنتجات</Button>
              </Link>
            </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">طلباتي</h1>
            <p className="text-gray-600">
              تتبع وإدارة جميع طلباتك من مكان واحد
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-rawasy-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي الطلبات</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.pending}
                    </div>
                    <div className="text-sm text-gray-600">قيد المعالجة</div>
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
                      {stats.completed}
                    </div>
                    <div className="text-sm text-gray-600">مكتملة</div>
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
                      {stats.cancelled}
                    </div>
                    <div className="text-sm text-gray-600">ملغية</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="بحث برقم الطلب أو اسم المنتج..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 text-right"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="min-w-[200px]">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as OrderStatus | "all")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md text-right"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">في انتظار التأكيد</option>
                    <option value="confirmed">مؤكد</option>
                    <option value="processing">قيد التحضير</option>
                    <option value="in_transit">في الطريق</option>
                    <option value="delivered">تم التسليم</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="min-w-[150px]">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "newest" | "oldest" | "total")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md text-right"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                    <option value="total">القيمة الأعلى</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          طلب رقم: {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="mr-1">
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-bold text-rawasy-600">
                        {formatPrice(order.total)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.items.length} منتج
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {item.name} ({item.quantity} {item.unit})
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{order.items.length - 3} المزيد
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 ml-1" />
                      <span>
                        التوصيل المتوقع: {formatDate(order.estimatedDelivery)}
                      </span>
                    </div>
                    <div className="mt-1">
                      العنوان: {order.shippingAddress.city}،{" "}
                      {order.shippingAddress.region}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/orders/${order.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض التفاصيل
                      </Button>
                    </Link>

                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 ml-1" />
                      تحميل الفاتورة
                    </Button>

                    {order.status === "delivered" && (
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4 ml-1" />
                        إعادة الطلب
                      </Button>
                    )}

                    {["pending", "confirmed"].includes(order.status) && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        إلغاء الطلب
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for Filtered Results */}
          {filteredOrders.length === 0 && orders.length > 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-600 mb-4">
                لم نجد أي طلبات تطابق معايير البحث الخاصة بك
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
              >
                إزالة المرشحات
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
