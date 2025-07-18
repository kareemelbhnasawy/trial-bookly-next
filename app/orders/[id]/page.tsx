"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  User,
  Download,
  RefreshCw,
  ArrowLeft,
  Star,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useOrderStore, getStatusLabel, type Order } from "@/stores/orderStore";
import { formatPrice, formatDate } from "@/lib/utils";

export default function OrderDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { getOrder } = useOrderStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const orderId = params.id as string;
  const isSuccess = searchParams.get("success") === "true";

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrder(orderId);
      setOrder(foundOrder || null);
    }

    if (isSuccess) {
      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [orderId, getOrder, isSuccess]);

  if (!order) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              الطلب غير موجود
            </h1>
            <p className="text-gray-600 mb-8">
              لم نتمكن من العثور على الطلب المطلوب
            </p>
            <Link href="/orders">
              <Button>العودة إلى قائمة الطلبات</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return "text-yellow-600 bg-yellow-100";
      case "processing":
      case "ready_for_dispatch":
      case "in_transit":
        return "text-blue-600 bg-blue-100";
      case "delivered":
      case "completed":
        return "text-green-600 bg-green-100";
      case "cancelled":
      case "returned":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                <div>
                  <h3 className="text-green-800 font-semibold">
                    تم إنشاء الطلب بنجاح!
                  </h3>
                  <p className="text-green-700 text-sm">
                    سيتم التواصل معك قريباً لتأكيد الطلب وتحديد موعد التوصيل
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              الرئيسية
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/orders" className="text-gray-500 hover:text-gray-700">
              طلباتي
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">طلب رقم {order.orderNumber}</span>
          </nav>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                طلب رقم: {order.orderNumber}
              </h1>
              <p className="text-gray-600">
                تم إنشاؤه في {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusLabel(order.status)}
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-1" />
                تحميل الفاتورة
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 ml-2" />
                    تتبع الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              index === 0 ? "bg-rawasy-600" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div className="mr-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              {event.description}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(event.timestamp)}
                            </span>
                          </div>
                          {event.location && (
                            <p className="text-sm text-gray-600 mt-1">
                              <MapPin className="h-3 w-3 inline ml-1" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 ml-2" />
                    تفاصيل المنتجات ({order.items.length} منتج)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg"
                      >
                        {/* Product Image Placeholder */}
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {item.nameEn}
                          </p>
                          <div className="flex items-center mt-1 space-x-4 space-x-reverse text-sm text-gray-600">
                            <span>{item.supplier.name}</span>
                            <span>•</span>
                            <span>{item.specifications.grade}</span>
                          </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.quantity} {item.unit} ×{" "}
                            {formatPrice(item.price)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline">
                            <Star className="h-3 w-3 ml-1" />
                            تقييم
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-3 w-3 ml-1" />
                            إعادة طلب
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 ml-2" />
                    عنوان التوصيل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 ml-2 text-gray-400" />
                      <span>{order.shippingAddress.fullName}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 ml-2 text-gray-400" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 ml-2 mt-1 text-gray-400 flex-shrink-0" />
                      <div>
                        <div>{order.shippingAddress.address}</div>
                        <div className="text-sm text-gray-600">
                          {order.shippingAddress.city}،{" "}
                          {order.shippingAddress.region}
                          {order.shippingAddress.postalCode &&
                            ` ${order.shippingAddress.postalCode}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>

                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>الخصم</span>
                      <span>-{formatPrice(order.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span>
                      {order.deliveryFee === 0
                        ? "مجاني"
                        : formatPrice(order.deliveryFee)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>المجموع الكلي</span>
                      <span className="text-rawasy-600">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 ml-2" />
                    معلومات التوصيل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">التوصيل المتوقع</div>
                    <div className="font-semibold">
                      {formatDate(order.estimatedDelivery)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">طريقة الدفع</div>
                    <div className="font-semibold">
                      {order.paymentMethod === "card"
                        ? "بطاقة ائتمانية"
                        : order.paymentMethod === "bank"
                          ? "تحويل بنكي"
                          : "الدفع عند الاستلام"}
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div>
                      <div className="text-sm text-gray-600">رقم التتبع</div>
                      <div className="font-semibold font-mono">
                        {order.trackingNumber}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 ml-2" />
                    تواصل مع المورد
                  </Button>

                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    إعادة الطلب
                  </Button>

                  {["pending", "confirmed"].includes(order.status) && (
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      إلغاء الطلب
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Help */}
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    تحتاج مساعدة؟
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    تواصل مع فريق الدعم للحصول على المساعدة
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    تواصل معنا
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/orders">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة إلى قائمة الطلبات
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
