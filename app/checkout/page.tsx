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
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

    // Card details (for demo)
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 5000 ? 0 : 150;
  const tax = subtotal * 0.15;
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
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
        Date.now() + 3 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 3 days from now
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

    // Clear cart
    clearCart();

    // Redirect to order confirmation
    router.push(`/orders/${orderId}?success=true`);
    setIsLoading(false);
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
            التاريخ المفضل للتوصيل
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
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleInputChange}
              className="h-4 w-4 text-rawasy-600 ml-3"
            />
            <CreditCard className="h-5 w-5 text-gray-600 ml-2" />
            <span>بطاقة ائتمانية / خصم</span>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <img src="/visa.png" alt="Visa" className="h-6" />
            <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={formData.paymentMethod === "bank"}
              onChange={handleInputChange}
              className="h-4 w-4 text-rawasy-600 ml-3"
            />
            <Building className="h-5 w-5 text-gray-600 ml-2" />
            <span>تحويل بنكي</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleInputChange}
              className="h-4 w-4 text-rawasy-600 ml-3"
            />
            <Truck className="h-5 w-5 text-gray-600 ml-2" />
            <span>الدفع عند الاستلام</span>
          </div>
          <span className="text-sm text-gray-500">رسوم إضافية 25 ريال</span>
        </div>
      </div>

      {/* Card Details */}
      {formData.paymentMethod === "card" && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">تفاصيل البطاقة</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم البطاقة *
            </label>
            <Input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className="text-left"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الانتهاء *
              </label>
              <Input
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="text-left"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <Input
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="text-left"
                maxLength={3}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم حامل البطاقة *
            </label>
            <Input
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="AHMED MOHAMMED ALALI"
              className="text-left"
              required
            />
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
        <Shield className="h-5 w-5 text-green-600 ml-2" />
        <span className="text-sm text-green-800">
          جميع المعاملات مشفرة ومؤمنة بتقنية SSL
        </span>
      </div>
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
                      <Button variant="outline" onClick={handleBack}>
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
