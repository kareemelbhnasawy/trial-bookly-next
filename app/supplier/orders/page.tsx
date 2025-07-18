"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Phone,
  MapPin,
  Filter,
  Search,
  Download,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useSupplierStore, type SupplierOrder } from "@/stores/supplierStore";
import { formatPrice, formatDate } from "@/lib/utils";

export default function SupplierOrdersPage() {
  const { orders, updateOrderStatus, getOrderStats } = useSupplierStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | SupplierOrder["status"]
  >("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "total">("newest");

  const orderStats = getOrderStats();

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
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

  const getStatusIcon = (status: SupplierOrder["status"]) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "accepted":
      case "processing":
        return <Package className="h-4 w-4 text-yellow-500" />;
      case "shipped":
        return <Package className="h-4 w-4 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: SupplierOrder["status"]) => {
    const labels: Record<SupplierOrder["status"], string> = {
      new: "طلب جديد",
      accepted: "مقبول",
      processing: "قيد التحضير",
      shipped: "تم الشحن",
      delivered: "تم التسليم",
      cancelled: "ملغي",
    };
    return labels[status];
  };

  const getStatusColor = (status: SupplierOrder["status"]) => {
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

  const handleStatusUpdate = (
    orderId: string,
    newStatus: SupplierOrder["status"],
  ) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getAvailableActions = (currentStatus: SupplierOrder["status"]) => {
    switch (currentStatus) {
      case "new":
        return [
          {
            label: "قبول الطلب",
            status: "accepted" as const,
            color: "bg-green-600",
          },
          {
            label: "رفض الطلب",
            status: "cancelled" as const,
            color: "bg-red-600",
          },
        ];
      case "accepted":
        return [
          {
            label: "بدء التحضير",
            status: "processing" as const,
            color: "bg-yellow-600",
          },
        ];
      case "processing":
        return [
          {
            label: "شحن الطلب",
            status: "shipped" as const,
            color: "bg-purple-600",
          },
        ];
      case "shipped":
        return [
          {
            label: "تأكيد التسليم",
            status: "delivered" as const,
            color: "bg-green-600",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              إدارة الطلبات
            </h1>
            <p className="text-gray-600">إدارة ومتابعة جميع طلبات العملاء</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-rawasy-600" />
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
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {orderStats.new}
                    </div>
                    <div className="text-sm text-gray-600">طلبات جديدة</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-yellow-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {orderStats.processing}
                    </div>
                    <div className="text-sm text-gray-600">قيد المعالجة</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-purple-600" />
                  <div className="mr-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {orderStats.shipped}
                    </div>
                    <div className="text-sm text-gray-600">تم الشحن</div>
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
                      {orderStats.delivered}
                    </div>
                    <div className="text-sm text-gray-600">تم التسليم</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="بحث برقم الطلب أو اسم العميل..."
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
                  <option value="new">طلبات جديدة</option>
                  <option value="accepted">مقبولة</option>
                  <option value="processing">قيد التحضير</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التسليم</option>
                  <option value="cancelled">ملغية</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-3 border border-gray-300 rounded-md text-right"
                >
                  <option value="newest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                  <option value="total">القيمة الأعلى</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            طلب #{order.orderNumber}
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

                    {/* Customer Info */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        معلومات العميل
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 text-gray-400 ml-2" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 ml-2" />
                          <span>{order.customerPhone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 ml-2" />
                          <span>{order.customerAddress}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        المنتجات المطلوبة
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm bg-white p-3 rounded border"
                          >
                            <div>
                              <span className="font-medium">
                                {item.productName}
                              </span>
                              <span className="text-gray-600 mr-2">
                                {item.quantity} {item.unit}
                              </span>
                            </div>
                            <div className="font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {getAvailableActions(order.status).map((action) => (
                          <Button
                            key={action.status}
                            size="sm"
                            className={`text-white ${action.color}`}
                            onClick={() =>
                              handleStatusUpdate(order.id, action.status)
                            }
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>

                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 ml-1" />
                          اتصال
                        </Button>

                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 ml-1" />
                          فاتورة
                        </Button>

                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 ml-1" />
                          تفاصيل
                        </Button>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <h4 className="font-medium text-yellow-800 mb-1">
                          ملاحظات العميل:
                        </h4>
                        <p className="text-sm text-yellow-700">{order.notes}</p>
                      </div>
                    )}

                    {/* Estimated Delivery */}
                    {order.estimatedDelivery && (
                      <div className="mt-4 text-sm text-gray-600">
                        <span className="font-medium">التوصيل المتوقع:</span>
                        <span className="mr-2">
                          {formatDate(order.estimatedDelivery)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-16 text-center">
                {orders.length === 0 ? (
                  <>
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      لا توجد طلبات
                    </h3>
                    <p className="text-gray-600">
                      لم تتلقَ أي طلبات بعد. ستظهر هنا عندما يطلب العملاء
                      منتجاتك
                    </p>
                  </>
                ) : (
                  <>
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-600 mb-6">
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
