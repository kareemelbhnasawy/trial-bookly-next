"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Truck,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 2000 ? 0 : 50; // Free delivery over 2000 EGP
  const discount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount with promo
  const tax = (subtotal - discount) * 0.14; // 14% VAT (Egypt rate)
  const total = subtotal + deliveryFee - discount + tax;

  const applyPromoCode = () => {
    if (promoCode === "RAWASY10") {
      setIsPromoApplied(true);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />

        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                سلة التسوق فارغة
              </h1>
              <p className="text-gray-600 mb-8">
                لم تقم بإضاف�� أي منتجات إلى سلة التسوق بعد
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              سلة التسوق
            </h1>
            <p className="text-gray-600">
              {getTotalItems()} م��تج في سلة التسوق
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 text-xs">صورة</span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {item.nameEn}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600">
                            {item.supplier.name}
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">
                            {item.specifications.grade}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= item.minOrder}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-center min-w-[3rem] py-2">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatPrice(item.price)} / {item.unit}
                        </div>
                        {item.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Minimum Order Notice */}
                    {item.quantity === item.minOrder && item.minOrder > 1 && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                          الحد الأدنى للطلب: {item.minOrder} {item.unit}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="h-4 w-4 ml-2" />
                  إفراغ السلة
                </Button>
                <Link href="/categories">
                  <Button variant="ghost">
                    <ArrowLeft className="h-4 w-4 ml-2" />
                    متابعة التسوق
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">كود الخصم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2 space-x-reverse">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="ادخل كود الخصم"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-right"
                      disabled={isPromoApplied}
                    />
                    <Button
                      onClick={applyPromoCode}
                      disabled={isPromoApplied || !promoCode}
                      variant="outline"
                    >
                      تطبيق
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <div className="text-sm text-green-600">
                      ✓ تم تطبيق خصم 10%
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>الخصم</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="flex items-center">
                        <Truck className="h-4 w-4 ml-1" />
                        التوصيل
                      </span>
                      <span>
                        {deliveryFee === 0 ? "مجاني" : formatPrice(deliveryFee)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>ضريبة القيمة المضافة (14%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>

                    {subtotal < 2000 && (
                      <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
                        أضف {formatPrice(2000 - subtotal)} للحصول على توصيل
                        مجاني
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>المجموع الكلي</span>
                      <span className="text-rawasy-600">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      متابعة للدفع
                    </Button>
                  </Link>

                  {/* Security Notice */}
                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <span className="ml-1">🔒</span>
                      دفع آمن ومشفر
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Truck className="h-8 w-8 text-rawasy-600 mx-auto" />
                    <h3 className="font-semibold">معلومات التوصيل</h3>
                    <p className="text-sm text-gray-600">
                      التوصيل خلال 2-4 أيام عمل
                    </p>
                    <p className="text-sm text-gray-600">
                      توصيل مجاني للطلبات أكثر من 2000 جنيه
                    </p>
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
