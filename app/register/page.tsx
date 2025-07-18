"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Building,
  Truck,
  Shield,
  Mail,
  Phone,
  MapPin,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

type UserType = "individual" | "business" | "supplier";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>("individual");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,

    // Individual fields
    firstName: "",
    lastName: "",
    nationalId: "",

    // Business fields
    companyName: "",
    tradeLicense: "",
    taxId: "",
    authorizedPerson: "",

    // Supplier fields
    companyDescription: "",
    warehouseLocation: "",
    businessCategories: [] as string[],

    // Address
    address: "",
    city: "",
    region: "",
  });
  const router = useRouter();

  const userTypes = [
    {
      type: "individual" as UserType,
      title: "فرد",
      description: "مالك منزل أو مقاول صغير",
      icon: User,
      features: ["طلب مواد البناء", "تتبع الطلبات", "دعم فني"],
    },
    {
      type: "business" as UserType,
      title: "شركة",
      description: "شركة مقاولات أو إنشاءات",
      icon: Building,
      features: ["طلبات بالجملة", "حسابات ائتمانية", "تقارير مفصلة"],
    },
    {
      type: "supplier" as UserType,
      title: "مورد",
      description: "مورد مواد البناء",
      icon: Truck,
      features: ["بيع المنتجات", "إدارة المخزون", "تحليلات المبيعات"],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo purposes, redirect to verification page
    router.push("/verify-email");
    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          اختر نوع الحساب
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.type}
                type="button"
                onClick={() => setUserType(type.type)}
                className={`p-4 rounded-lg border-2 text-right transition-all ${
                  userType === type.type
                    ? "border-rawasy-500 bg-rawasy-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div
                    className={`p-2 rounded-lg ${
                      userType === type.type ? "bg-rawasy-100" : "bg-gray-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-6 w-6 ${
                        userType === type.type
                          ? "text-rawasy-600"
                          : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {type.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {type.description}
                    </p>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full ml-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      userType === type.type
                        ? "border-rawasy-500 bg-rawasy-500"
                        : "border-gray-300"
                    }`}
                  >
                    {userType === type.type && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          معلومات الحساب
        </h3>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="user@example.com"
              className="text-right"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الجوال *
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+966 5X XXX XXXX"
              className="text-right"
              required
            />
          </div>
        </div>

        {/* Type-specific fields */}
        {userType === "individual" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول *
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="أحمد"
                  className="text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم العائلة *
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="محمد"
                  className="text-right"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهوية الوطنية *
              </label>
              <Input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                placeholder="1234567890"
                className="text-right"
                required
              />
            </div>
          </>
        )}

        {userType === "business" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الشركة *
              </label>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="شرك�� البناء المتطور المحدودة"
                className="text-right"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم السجل التجاري *
                </label>
                <Input
                  type="text"
                  name="tradeLicense"
                  value={formData.tradeLicense}
                  onChange={handleInputChange}
                  placeholder="1010123456"
                  className="text-right"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرقم الضريبي
                </label>
                <Input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="300123456700003"
                  className="text-right"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الشخص المخول *
              </label>
              <Input
                type="text"
                name="authorizedPerson"
                value={formData.authorizedPerson}
                onChange={handleInputChange}
                placeholder="أحمد محمد العلي"
                className="text-right"
                required
              />
            </div>
          </>
        )}

        {userType === "supplier" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الشركة *
              </label>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="مؤسسة مواد البناء الذهبية"
                className="text-right"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف النشاط التجاري *
              </label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleInputChange}
                placeholder="نحن متخصصون في توريد مواد البناء عالية الجودة..."
                className="w-full p-3 border border-gray-300 rounded-md text-right resize-none"
                rows={3}
                required
              />
            </div>
          </>
        )}

        {/* Password fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور *
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="كلمة مرور قوية"
                className="text-right pl-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تأكيد كلمة المرور *
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="أعد كتابة كلمة المرور"
                className="text-right pl-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          معلومات العنوان
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              العنوان التفصيلي *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="حي الملك فهد، شارع الأمير محمد بن عبد العزيز، مبنى 123"
              className="w-full p-3 border border-gray-300 rounded-md text-right resize-none"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="khobar">الخبر</option>
                <option value="dhahran">الظهران</option>
                <option value="taif">الطائف</option>
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
                <option value="medina-region">منطقة المدينة المنورة</option>
                <option value="qassim-region">منطقة القصيم</option>
                <option value="hail-region">منطقة حائل</option>
                <option value="northern-region">منطقة الحدود الشمالية</option>
                <option value="jazan-region">منطقة جازان</option>
                <option value="najran-region">منطقة نجران</option>
                <option value="bahah-region">منطقة الباحة</option>
                <option value="tabuk-region">منطقة تبوك</option>
                <option value="asir-region">منطقة عسير</option>
                <option value="jouf-region">منطقة الجوف</option>
              </select>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6">
          <div className="flex items-start">
            <input
              id="agree-terms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-rawasy-600 focus:ring-rawasy-500 border-gray-300 rounded mt-1"
              required
            />
            <label
              htmlFor="agree-terms"
              className="mr-3 block text-sm text-gray-900"
            >
              أوافق على{" "}
              <Link
                href="/terms"
                className="text-rawasy-600 hover:text-rawasy-500"
              >
                شروط الاستخدام
              </Link>{" "}
              و{" "}
              <Link
                href="/privacy"
                className="text-rawasy-600 hover:text-rawasy-500"
              >
                سياسة الخصوصية
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Logo */}
        <Link href="/" className="flex justify-center items-center mb-6">
          <Building2 className="h-10 w-10 text-rawasy-600 ml-2" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-rawasy-600">رواسي</h1>
            <p className="text-sm text-gray-500">مواد البناء</p>
          </div>
        </Link>

        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              إنشاء حساب جديد
            </CardTitle>
            <CardDescription>
              انضم إلى منصة رواسي واكتشف أفضل مواد البناء
            </CardDescription>

            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step
                          ? "bg-rawasy-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-px mx-2 ${
                          currentStep > step ? "bg-rawasy-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    السابق
                  </Button>
                )}
                <div className="flex-1"></div>
                <Button
                  type="submit"
                  disabled={
                    isLoading || (currentStep === 3 && !formData.agreeToTerms)
                  }
                  className="min-w-[120px]"
                >
                  {isLoading
                    ? "جاري الإنشاء..."
                    : currentStep < 3
                      ? "التالي"
                      : "إنشاء الحساب"}
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="text-rawasy-600 hover:text-rawasy-500 font-medium"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
