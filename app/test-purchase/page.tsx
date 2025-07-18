"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  Package,
  CreditCard,
  Truck,
  Star,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCartStore } from "@/stores/cartStore";
import { sampleProducts } from "@/lib/sampleProducts";
import { formatPrice } from "@/lib/utils";

export default function PurchaseTestPage() {
  const { addItem, items, getTotalItems, getTotalPrice, clearCart } =
    useCartStore();
  const [testStage, setTestStage] = useState<
    "products" | "cart" | "checkout" | "complete"
  >("products");

  const handleAddToCart = (product: (typeof sampleProducts)[0]) => {
    addItem(product, product.minOrder);
    console.log(`تم إضافة ${product.name} إلى السلة`);
  };

  const testProducts = sampleProducts.slice(0, 4);

  const progressSteps = [
    { key: "products", label: "اختيار المنتجات", icon: Package },
    { key: "cart", label: "مراجعة السلة", icon: ShoppingCart },
    { key: "checkout", label: "الدفع", icon: CreditCard },
    { key: "complete", label: "تأكيد الطلب", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <Card className="mb-8 bg-gradient-to-r from-rawasy-600 to-rawasy-700 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">
                ✅ اختبار تدفق الشراء الكامل - بالجنيه المصري
              </CardTitle>
              <p className="text-rawasy-100">
                تم تحديث العملة إلى الجنيه المصري (EGP) وتنفيذ تدفق الشراء
                الكامل
              </p>
            </CardHeader>
          </Card>

          {/* Progress Indicator */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {progressSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.key === testStage;
                  const isCompleted =
                    progressSteps.findIndex((s) => s.key === testStage) > index;

                  return (
                    <div key={step.key} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isActive
                                ? "bg-rawasy-600 text-white"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <Icon className="h-6 w-6" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-rawasy-600"
                              : isCompleted
                                ? "text-green-600"
                                : "text-gray-600"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < progressSteps.length - 1 && (
                        <ArrowRight
                          className={`h-5 w-5 mx-4 ${
                            isCompleted ? "text-green-500" : "text-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-rawasy-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {getTotalItems()}
                </div>
                <div className="text-sm text-gray-600">منتج في السلة</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(getTotalPrice())}
                </div>
                <div className="text-sm text-gray-600">إجمالي السلة</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {getTotalPrice() > 2000 ? "مجاني" : formatPrice(50)}
                </div>
                <div className="text-sm text-gray-600">رسوم التوصيل</div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Products */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>منتجات للاختبار - بالجنيه المصري</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.nameEn}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-rawasy-600">
                          {formatPrice(product.price)}
                        </div>
                        <div className="text-xs text-gray-500">
                          / {product.unit}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 mr-1">4.8</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-3">
                      المورد: {product.supplier.name}
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      أضف للسلة
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Link href="/categories/steel">
                  <Button variant="outline" className="w-full">
                    <Package className="h-4 w-4 ml-2" />
                    تصفح المنتجات
                  </Button>
                </Link>

                <Link href="/cart">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="h-4 w-4 ml-2" />
                    عرض السلة ({getTotalItems()})
                  </Button>
                </Link>

                <Link href="/checkout">
                  <Button className="w-full" disabled={getTotalItems() === 0}>
                    <CreditCard className="h-4 w-4 ml-2" />
                    المتابعة للدفع
                  </Button>
                </Link>

                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700"
                  disabled={getTotalItems() === 0}
                >
                  إفراغ السلة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>✅ المميزات المنجزة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    تحديث العملة
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      • تم تغيير العملة من الريال السعودي (SAR) إلى الجنيه
                      المصري (EGP)
                    </li>
                    <li>• تحديث جميع أسعار المنتجات والرسوم</li>
                    <li>• تحديث حد التوصيل المجاني إلى 2000 جنيه</li>
                    <li>• تحديث معدل ضريبة القيمة المضافة إلى 14%</li>
                    <li>• تحديث أرقام الهواتف وطرق الدفع المصرية</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    تدفق الشراء الكامل
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• إضافة منتجات إلى السلة مع تحديد الكميات</li>
                    <li>• مراجعة السلة وتعديل الكميات</li>
                    <li>• عملية دفع متكاملة مع خيارات مصرية</li>
                    <li>• إنشاء الطلبات وتأكيدها</li>
                    <li>• تتبع الطلبات ومراجعة التفاصيل</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
