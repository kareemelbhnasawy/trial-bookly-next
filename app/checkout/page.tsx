"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Calendar,
  Shield,
  ArrowLeft,
  Check,
  AlertCircle,
  Smartphone,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { usePaymentStore } from "@/stores/paymentStore";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const {
    availableGateways,
    savedCards,
    getDefaultCard,
    processPayment,
    calculateFees,
  } = usePaymentStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping info
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",

    // Delivery preferences
    deliveryDate: "",
    deliveryTime: "morning",
    specialInstructions: "",

    // Payment
    paymentMethod: "card",
    selectedCardId: "",

    // New card details (if adding new card)
    newCard: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      saveCard: false,
    },
  });

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 5000 ? 0 : 150;
  const paymentFees = calculateFees(subtotal, formData.paymentMethod as any);
  const tax = (subtotal + deliveryFee + paymentFees) * 0.15;
  const total = subtotal + deliveryFee + paymentFees + tax;

  const enabledGateways = availableGateways.filter((g) => g.isEnabled);
  const defaultCard = getDefaultCard();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : false;

    if (name.startsWith("newCard.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        newCard: {
          ...prev.newCard,
          [fieldName]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setPaymentProcessing(true);

    try {
      // Create order first
      const orderId = createOrder({
        status: "pending",
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          nameEn: item.nameEn,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
          supplier: item.supplier,
          specifications: item.specifications,
        })),
        subtotal,
        discount: 0,
        deliveryFee,
        tax,
        total,
        estimatedDelivery: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          region: formData.region,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod,
        notes: formData.specialInstructions,
      });

      // Process payment if not COD
      if (formData.paymentMethod !== "cod") {
        const paymentResult = await processPayment({
          orderId,
          amount: total,
          currency: "SAR",
          method: formData.paymentMethod as any,
          paymentDetails:
            formData.paymentMethod === "card"
              ? {
                  cardId: formData.selectedCardId || "new",
                  ...formData.newCard,
                }
              : {},
        });

        if (paymentResult.status === "failed") {
          throw new Error(paymentResult.failureReason || "Payment failed");
        }
      }

      // Clear cart on success
      clearCart();

      // Redirect to order confirmation
      router.push(`/orders/${orderId}?success=true`);
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
      setPaymentProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">معلومات الشحن</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل *
          </label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="أحمد محمد العلي"
            className="text-right"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رقم الجوال *
          </label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+966 5X XXX XXXX"
            className="text-right"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          البريد الإلكتروني
        </label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="ahmed@example.com"
          className="text-right"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          العنوان التفصيلي *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="حي الملك فهد، شارع الأمير محمد بن عبد العزيز، مبنى 123، الدور الثاني"
          className="w-full p-3 border border-gray-300 rounded-md text-right resize-none"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المدينة *
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-right"
            required
          >
            <option value="">اختر المدينة</option>
            <option value="riyadh">الرياض</option>
            <option value="jeddah">جدة</option>
            <option value="dammam">الدمام</option>
            <option value="mecca">مكة المكرمة</option>
            <option value="medina">المدينة المنورة</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المنطقة *
          </label>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-right"
            required
          >
            <option value="">اختر المنطقة</option>
            <option value="riyadh-region">منطقة الرياض</option>
            <option value="mecca-region">منطقة مكة المكرمة</option>
            <option value="eastern-region">المنطقة الشرقية</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الرمز البريدي
          </label>
          <Input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            placeholder="12345"
            className="text-right"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">تفضيلات التوصيل</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ��لتاريخ المفضل للتوصيل
          </label>
          <Input
            name="deliveryDate"
            type="date"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
            className="text-right"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الوقت المفضل
          </label>
          <select
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-right"
          >
            <option value="morning">صباحاً (8 ص - 12 ظ)</option>
            <option value="afternoon">بعد الظهر (12 ظ - 5 م)</option>
            <option value="evening">مساءً (5 م - 8 م)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          تعليمات خاصة للتوصيل
        </label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleInputChange}
          placeholder="مثال: التوصيل إلى الباب الخلفي، الاتصال قبل الوصول بـ 30 دقيقة..."
          className="w-full p-3 border border-gray-300 rounded-md text-right resize-none"
          rows={3}
        />
      </div>

      {/* Delivery Options */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-3">خيارات التوصيل</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-md border">
            <div className="flex items-center">
              <input
                type="radio"
                name="deliveryOption"
                value="standard"
                defaultChecked
                className="h-4 w-4 text-rawasy-600 ml-3"
              />
              <div>
                <div className="font-medium">التوصيل العادي</div>
                <div className="text-sm text-gray-600">3-5 أيام عمل</div>
              </div>
            </div>
            <div className="text-rawasy-600 font-medium">
              {deliveryFee === 0 ? "مجاني" : formatPrice(deliveryFee)}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-md border">
            <div className="flex items-center">
              <input
                type="radio"
                name="deliveryOption"
                value="express"
                className="h-4 w-4 text-rawasy-600 ml-3"
              />
              <div>
                <div className="font-medium">التوصيل السريع</div>
                <div className="text-sm text-gray-600">1-2 أيام عمل</div>
              </div>
            </div>
            <div className="text-rawasy-600 font-medium">
              {formatPrice(deliveryFee + 100)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">طريقة الدفع</h2>

      {/* Payment Methods */}
      <div className="space-y-3">
        {enabledGateways.map((gateway) => (
          <div
            key={gateway.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value={gateway.type}
                checked={formData.paymentMethod === gateway.type}
                onChange={handleInputChange}
                className="h-4 w-4 text-rawasy-600 ml-3"
              />
              <div className="flex items-center">
                {gateway.type === "card" && (
                  <CreditCard className="h-5 w-5 text-gray-600 ml-2" />
                )}
                {gateway.type === "bank_transfer" && (
                  <Building className="h-5 w-5 text-gray-600 ml-2" />
                )}
                {gateway.type === "cod" && (
                  <Truck className="h-5 w-5 text-gray-600 ml-2" />
                )}
                {gateway.type === "stc_pay" && (
                  <Smartphone className="h-5 w-5 text-gray-600 ml-2" />
                )}
                {gateway.type === "apple_pay" && (
                  <Smartphone className="h-5 w-5 text-gray-600 ml-2" />
                )}
                <span>{gateway.nameAr}</span>
              </div>
            </div>
            <div className="text-left">
              {gateway.fees.percentage > 0 && (
                <div className="text-sm text-gray-500">
                  رسوم: {gateway.fees.percentage}%
                  {gateway.fees.fixed > 0 &&
                    ` + ${formatPrice(gateway.fees.fixed)}`}
                </div>
              )}
              {gateway.fees.fixed > 0 && gateway.fees.percentage === 0 && (
                <div className="text-sm text-gray-500">
                  رسوم: {formatPrice(gateway.fees.fixed)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Card Selection/Input */}
      {formData.paymentMethod === "card" && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">تفاصيل البطاقة</h3>

          {/* Saved Cards */}
          {savedCards.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">
                البطاقات المحفوظة
              </h4>
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center p-3 border rounded-md bg-white"
                >
                  <input
                    type="radio"
                    name="selectedCardId"
                    value={card.id}
                    checked={formData.selectedCardId === card.id}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-rawasy-600 ml-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      •••• •••• •••• {card.last4}
                    </div>
                    <div className="text-sm text-gray-600">
                      {card.brand} •{" "}
                      {card.expiryMonth.toString().padStart(2, "0")}/
                      {card.expiryYear.toString().slice(-2)}
                    </div>
                  </div>
                  {card.isDefault && (
                    <span className="text-xs bg-rawasy-100 text-rawasy-800 px-2 py-1 rounded-full">
                      افتراضي
                    </span>
                  )}
                </div>
              ))}

              <div className="flex items-center p-3 border rounded-md bg-white">
                <input
                  type="radio"
                  name="selectedCardId"
                  value=""
                  checked={formData.selectedCardId === ""}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-rawasy-600 ml-3"
                />
                <span className="font-medium">استخدام بطاقة جديدة</span>
              </div>
            </div>
          )}

          {/* New Card Form */}
          {(savedCards.length === 0 || formData.selectedCardId === "") && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">
                {savedCards.length > 0 ? "بطاقة جديدة" : "تفاصيل البطاقة"}
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم البطاقة *
                </label>
                <Input
                  name="newCard.cardNumber"
                  value={formData.newCard.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    handleInputChange({
                      ...e,
                      target: { ...e.target, value: formatted },
                    } as any);
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="text-left"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ الانتهاء *
                  </label>
                  <Input
                    name="newCard.expiryDate"
                    value={formData.newCard.expiryDate}
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value);
                      handleInputChange({
                        ...e,
                        target: { ...e.target, value: formatted },
                      } as any);
                    }}
                    placeholder="MM/YY"
                    className="text-left"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <Input
                    name="newCard.cvv"
                    value={formData.newCard.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="text-left"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم حامل البطاقة *
                </label>
                <Input
                  name="newCard.cardName"
                  value={formData.newCard.cardName}
                  onChange={handleInputChange}
                  placeholder="AHMED MOHAMMED ALALI"
                  className="text-left"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="newCard.saveCard"
                  checked={formData.newCard.saveCard}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-rawasy-600 ml-2"
                />
                <label className="text-sm text-gray-700">
                  حفظ البطاقة للاستخدام المستقبلي
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
        <Shield className="h-5 w-5 text-green-600 ml-2" />
        <span className="text-sm text-green-800">
          جميع المعاملات مشفرة ومؤمنة بتقنية SSL
        </span>
      </div>

      {/* Payment Processing Notice */}
      {paymentProcessing && (
        <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-600 ml-2 animate-spin" />
          <span className="text-sm text-blue-800">
            جاري معالجة الدفع... يرجى عدم إغلاق الصفحة
          </span>
        </div>
      )}
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              لا توجد منتجات في السلة
            </h1>
            <p className="text-gray-600 mb-8">
              يجب إضافة منتجات إلى السلة أولاً قبل المتابعة للدفع
            </p>
            <Link href="/categories">
              <Button>تصفح المنتجات</Button>
            </Link>
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
          {/* Breadcrumb */}
          <nav className="text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              الرئيسية
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              السلة
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">الدفع</span>
          </nav>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 space-x-reverse">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? "bg-rawasy-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step ? <Check className="h-5 w-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-px mx-3 ${
                        currentStep > step ? "bg-rawasy-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    {currentStep > 1 ? (
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={isLoading}
                      >
                        <ArrowLeft className="h-4 w-4 ml-2" />
                        السابق
                      </Button>
                    ) : (
                      <Link href="/cart">
                        <Button variant="outline">
                          <ArrowLeft className="h-4 w-4 ml-2" />
                          العودة للسلة
                        </Button>
                      </Link>
                    )}

                    {currentStep < 3 ? (
                      <Button onClick={handleNext}>التالي</Button>
                    ) : (
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className="min-w-[150px]"
                      >
                        {isLoading ? "جاري المعالجة..." : "تأكيد الطلب"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <div className="flex-1">
                          <div className="font-medium truncate">
                            {item.name}
                          </div>
                          <div className="text-gray-500">
                            {item.quantity} {item.unit} ×{" "}
                            {formatPrice(item.price)}
                          </div>
                        </div>
                        <div className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>التوصيل</span>
                      <span>
                        {deliveryFee === 0 ? "مجاني" : formatPrice(deliveryFee)}
                      </span>
                    </div>

                    {paymentFees > 0 && (
                      <div className="flex justify-between">
                        <span>رسوم الدفع</span>
                        <span>{formatPrice(paymentFees)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>ضريبة القيمة المضافة</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>المجموع الكلي</span>
                      <span className="text-rawasy-600">
                        {formatPrice(total)}
                      </span>
                    </div>
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
