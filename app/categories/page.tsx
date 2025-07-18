import { Metadata } from "next";
import Link from "next/link";
import { Building2, Hammer, Truck, Shield, Users, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/home/CategoryCard";

export const metadata: Metadata = {
  title: "فئات المنتجات - رواسي",
  description: "تصفح جميع فئات مواد البناء المتاحة في منصة رواسي",
};

const allCategories = [
  {
    id: "steel",
    name: "حديد وصلب",
    nameEn: "Steel & Iron",
    icon: Building2,
    image: "/categories/steel.jpg",
    itemCount: 1250,
    href: "/categories/steel",
    description: "حديد التسليح، الهياكل المعدنية، الأنابيب المعدنية",
  },
  {
    id: "cement",
    name: "اسمنت",
    nameEn: "Cement",
    icon: Hammer,
    image: "/categories/cement.jpg",
    itemCount: 890,
    href: "/categories/cement",
    description: "اسمنت بورتلاند، اسمنت سريع التصلب، اسمنت أبيض",
  },
  {
    id: "aggregates",
    name: "ركام ورمل",
    nameEn: "Aggregates & Sand",
    icon: Truck,
    image: "/categories/aggregates.jpg",
    itemCount: 650,
    href: "/categories/aggregates",
    description: "رمل، حصى، زلط، ركام مختلف الأحجام",
  },
  {
    id: "masonry",
    name: "طوب وبلوك",
    nameEn: "Bricks & Blocks",
    icon: Shield,
    image: "/categories/masonry.jpg",
    itemCount: 420,
    href: "/categories/masonry",
    description: "طوب أحمر، بلوك خرساني، حجر طبيعي",
  },
  {
    id: "plumbing",
    name: "سباكة",
    nameEn: "Plumbing",
    icon: Users,
    image: "/categories/plumbing.jpg",
    itemCount: 750,
    href: "/categories/plumbing",
    description: "أنابيب، وصلات، صنابير، أدوات سباكة",
  },
  {
    id: "electrical",
    name: "كهرباء",
    nameEn: "Electrical",
    icon: Star,
    image: "/categories/electrical.jpg",
    itemCount: 980,
    href: "/categories/electrical",
    description: "كابلات، مفاتيح، لوحات توزيع، إضاءة",
  },
  {
    id: "concrete",
    name: "خرسانة جاهزة",
    nameEn: "Ready Mix Concrete",
    icon: Truck,
    image: "/categories/concrete.jpg",
    itemCount: 320,
    href: "/categories/concrete",
    description: "خرسانة جاهزة، خرسانة مسلحة، خرسانة خاصة",
  },
  {
    id: "tiles",
    name: "بلاط وسيراميك",
    nameEn: "Tiles & Ceramics",
    icon: Shield,
    image: "/categories/tiles.jpg",
    itemCount: 680,
    href: "/categories/tiles",
    description: "بلاط، سيراميك، رخام، جرانيت",
  },
  {
    id: "insulation",
    name: "عزل",
    nameEn: "Insulation",
    icon: Shield,
    image: "/categories/insulation.jpg",
    itemCount: 290,
    href: "/categories/insulation",
    description: "عزل حراري، عزل مائي، عزل صوتي",
  },
  {
    id: "paint",
    name: "دهانات",
    nameEn: "Paints",
    icon: Building2,
    image: "/categories/paint.jpg",
    itemCount: 450,
    href: "/categories/paint",
    description: "دهانات داخلية، دهانات خارجية، معجون",
  },
  {
    id: "tools",
    name: "أدوات البناء",
    nameEn: "Construction Tools",
    icon: Hammer,
    image: "/categories/tools.jpg",
    itemCount: 1100,
    href: "/categories/tools",
    description: "أدوات يدوية، أدوات كهربائية، معدات بناء",
  },
  {
    id: "windows",
    name: "نوافذ وأبواب",
    nameEn: "Windows & Doors",
    icon: Building2,
    image: "/categories/windows.jpg",
    itemCount: 380,
    href: "/categories/windows",
    description: "نوافذ ألمنيوم، أبواب خشبية، أبواب معدنية",
  },
];

export default function CategoriesPage() {
  const totalProducts = allCategories.reduce(
    (sum, cat) => sum + cat.itemCount,
    0,
  );

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Page Header */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                فئات المنتجات
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                اكتشف مجموعة واسعة من مواد البناء عالية الجودة من موردين موثوقين
              </p>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-8 space-x-reverse">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rawasy-600">
                    {allCategories.length}
                  </div>
                  <div className="text-sm text-gray-600">فئة رئيسية</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rawasy-600">
                    {totalProducts.toLocaleString("ar-SA")}+
                  </div>
                  <div className="text-sm text-gray-600">منتج متاح</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rawasy-600">250+</div>
                  <div className="text-sm text-gray-600">مورد موثوق</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCategories.map((category) => (
                <div key={category.id}>
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rawasy-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
            <p className="text-xl text-rawasy-100 mb-8 max-w-2xl mx-auto">
              تواصل مع فريق الدعم المتخصص لدينا وسنساعدك في العثور على المنتجات
              المناسبة لمشروعك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-rawasy-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                  تواصل معنا
                </button>
              </Link>
              <Link href="/request-quote">
                <button className="border-2 border-white text-white hover:bg-white hover:text-rawasy-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                  طلب عرض سعر
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
