import Link from "next/link";
import { Search, Building2, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-rawasy-600 via-rawasy-700 to-rawasy-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                منصة
                <span className="text-rawasy-300"> رواسي </span>
                لمواد البناء
              </h1>
              <p className="text-xl lg:text-2xl text-rawasy-100 leading-relaxed">
                اكتشف أفضل مواد البناء من موردين موثوقين في جميع أنحاء الشرق
                الأوسط
              </p>
              <p className="text-lg text-rawasy-200">
                أسعار تنافسية • جودة مضمونة • توصيل سريع
              </p>
            </div>

            {/* Hero Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">
                ابدأ البحث عن مواد البناء
              </h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="ابحث عن اسمنت، حديد، رمل..."
                    className="bg-white text-gray-900 border-0 text-right"
                  />
                </div>
                <Button className="bg-rawasy-500 hover:bg-rawasy-400 px-8">
                  <Search className="h-5 w-5 ml-2" />
                  بحث
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-rawasy-200">البحث الشائع:</span>
                {["اسمنت", "حديد تسليح", "رمل", "طوب أحمر"].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${term}`}
                    className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/categories">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-rawasy-600 hover:bg-gray-100"
                >
                  تصفح المنتجات
                </Button>
              </Link>
              <Link href="/suppliers/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-rawasy-600"
                >
                  انضم كمورد
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Features */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      5000+ منتج متاح
                    </h3>
                    <p className="text-rawasy-100 text-sm">
                      مجموعة واسعة من مواد البناء عالية الجودة من موردين موثوقين
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      توصيل في نفس اليوم
                    </h3>
                    <p className="text-rawasy-100 text-sm">
                      شبكة توصيل واسعة تغطي جميع المدن الرئيسية مع إمكانية
                      التتبع المباشر
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">ضمان الجودة</h3>
                    <p className="text-rawasy-100 text-sm">
                      جميع المنتجات مفحوصة ومعتمدة حسب المواصفات العالمية
                      والمحلية
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-center space-y-2">
                <p className="text-sm text-rawasy-200">معتمد من قبل</p>
                <div className="flex justify-center items-center space-x-6 space-x-reverse">
                  <div className="text-white font-medium">SASO</div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="text-white font-medium">ISO 9001</div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="text-white font-medium">غرفة التجارة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
