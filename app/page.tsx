import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Hammer,
  Truck,
  Shield,
  Users,
  Star,
  ArrowLeft,
  Search,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/home/CategoryCard";
import FeaturedSupplier from "@/components/home/FeaturedSupplier";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export const metadata: Metadata = {
  title: "رواسي - منصة مواد البناء الشاملة في الشرق الأوسط",
  description:
    "اكتشف أفضل مواد البناء من موردين موثوقين. اسمنت، حديد، رمل، خرسانة وأكثر. توصيل سريع وأسعار تنافسية.",
};

const categories = [
  {
    id: "steel",
    name: "حديد وصلب",
    nameEn: "Steel & Iron",
    icon: Building2,
    image: "/categories/steel.jpg",
    itemCount: 1250,
    href: "/categories/steel",
  },
  {
    id: "cement",
    name: "اسمنت",
    nameEn: "Cement",
    icon: Hammer,
    image: "/categories/cement.jpg",
    itemCount: 890,
    href: "/categories/cement",
  },
  {
    id: "aggregates",
    name: "ركام ورمل",
    nameEn: "Aggregates & Sand",
    icon: Truck,
    image: "/categories/aggregates.jpg",
    itemCount: 650,
    href: "/categories/aggregates",
  },
  {
    id: "masonry",
    name: "طوب وبلوك",
    nameEn: "Bricks & Blocks",
    icon: Shield,
    image: "/categories/masonry.jpg",
    itemCount: 420,
    href: "/categories/masonry",
  },
  {
    id: "plumbing",
    name: "سباكة",
    nameEn: "Plumbing",
    icon: Users,
    image: "/categories/plumbing.jpg",
    itemCount: 750,
    href: "/categories/plumbing",
  },
  {
    id: "electrical",
    name: "كهرباء",
    nameEn: "Electrical",
    icon: Star,
    image: "/categories/electrical.jpg",
    itemCount: 980,
    href: "/categories/electrical",
  },
];

const featuredSuppliers = [
  {
    id: "1",
    name: "شركة الخليج للاسمنت",
    nameEn: "Gulf Cement Company",
    logo: "/suppliers/gulf-cement.png",
    rating: 4.8,
    reviewCount: 245,
    location: "الرياض، السعودية",
    specialties: ["اسمنت", "خرسانة جاهزة", "مواد كيميائية"],
    verified: true,
    href: "/suppliers/gulf-cement",
  },
  {
    id: "2",
    name: "مؤسسة الحديد المتطور",
    nameEn: "Advanced Steel Foundation",
    logo: "/suppliers/advanced-steel.png",
    rating: 4.9,
    reviewCount: 189,
    location: "دبي، الإمارات",
    specialties: ["حديد التسليح", "هياكل معدنية", "أنابيب"],
    verified: true,
    href: "/suppliers/advanced-steel",
  },
  {
    id: "3",
    name: "شركة الإمارات للطوب",
    nameEn: "Emirates Brick Company",
    logo: "/suppliers/emirates-brick.png",
    rating: 4.7,
    reviewCount: 167,
    location: "أبوظبي، الإمارات",
    specialties: ["طوب أحمر", "بلوك", "حجر طبيعي"],
    verified: true,
    href: "/suppliers/emirates-brick",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                تصفح فئات المنتجات
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                اكتشف مجموعة واسعة من مواد البناء عالية الجودة من موردين موثوقين
                في جميع أنحاء المنطقة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Suppliers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  موردون مميزون
                </h2>
                <p className="text-lg text-gray-600">
                  شركاء موثوقون مع تقييمات عالية وخدمة استثنائية
                </p>
              </div>
              <Link
                href="/suppliers"
                className="inline-flex items-center text-rawasy-600 hover:text-rawasy-700 font-medium"
              >
                عرض جميع الموردين
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSuppliers.map((supplier) => (
                <FeaturedSupplier key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Statistics Section */}
        <section className="py-16 construction-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-rawasy-100">منتج متاح</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">250+</div>
                <div className="text-rawasy-100">مورد موثوق</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <div className="text-rawasy-100">طلب مكتمل</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-rawasy-100">رضا العملاء</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                لماذا تختار رواسي؟
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                منصة شاملة مصممة خصيصاً لتلبية احتياجات صناعة البناء في الشرق
                الأوسط
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-rawasy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-rawasy-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  موردون موثوقون
                </h3>
                <p className="text-gray-600">
                  جميع الموردين مُت��ققٌ منهم ومُرخصون لضمان أعلى مستويات الجودة
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-rawasy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-rawasy-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  توصيل سريع
                </h3>
                <p className="text-gray-600">
                  شبكة توصيل واسعة تغطي جميع أنحاء المنطقة مع تتبع مباشر للطلبات
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-rawasy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-rawasy-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  دعم متخصص
                </h3>
                <p className="text-gray-600">
                  فريق دعم متخصص في مواد البناء متاح على مدار الساعة لمساعدتك
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
