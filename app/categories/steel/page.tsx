"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  MapPin,
  Truck,
  Shield,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { getProductsByCategory } from "@/lib/sampleProducts";

// Get steel products from sample data
const steelProducts = getProductsByCategory("steel");

// Transform sample products to match the expected interface
const products = steelProducts.map((product) => ({
  ...product,
  rating: 4.8,
  reviewCount: 124,
  inStock: true,
  stockQuantity: 500,
  features: ["جودة عالية", "توصيل سريع", "ضمان الجودة"],
}));

const filters = {
  priceRanges: [
    { label: "أقل من 100 ريال", min: 0, max: 100 },
    { label: "100 - 500 ريال", min: 100, max: 500 },
    { label: "500 - 1000 ريال", min: 500, max: 1000 },
    { label: "1000 - 3000 ريال", min: 1000, max: 3000 },
    { label: "أ��ثر من 3000 ريال", min: 3000, max: Infinity },
  ],
  suppliers: [
    "شركة الخليج للحديد",
    "مؤسسة الحديد المتطور",
    "شركة الأنابيب الذهبية",
    "مصنع الألواح المعدنية",
  ],
  ratings: [5, 4, 3, 2, 1],
};

export default function SteelCategoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null as any,
    suppliers: [] as string[],
    minRating: 0,
    inStockOnly: false,
  });

  const handleAddToCart = (productId: string) => {
    // Add to cart logic
    console.log("Added to cart:", productId);
  };

  const handleAddToWishlist = (productId: string) => {
    // Add to wishlist logic
    console.log("Added to wishlist:", productId);
  };

  const ProductCard = ({
    product,
    isListView = false,
  }: {
    product: any;
    isListView?: boolean;
  }) => (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isListView ? "flex" : ""
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative ${isListView ? "w-48" : "aspect-square"} bg-gray-100`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">صورة المنتج</span>
        </div>

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 left-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => handleAddToWishlist(product.id)}
            className="h-8 w-8"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Link href={`/products/${product.id}`}>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">غير متوفر</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className={`p-4 ${isListView ? "flex-1" : ""}`}>
        <div className="space-y-3">
          {/* Supplier Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-3 w-3 ml-1" />
              <span>{product.supplier.location}</span>
              {product.supplier.verified && (
                <Shield className="h-3 w-3 mr-1 text-green-500" />
              )}
            </div>
            {product.inStock && (
              <span className="text-xs text-green-600 font-medium">
                متوفر ({product.stockQuantity})
              </span>
            )}
          </div>

          {/* Product Name */}
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-rawasy-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.nameEn}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 space-x-reverse">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviewCount})
            </span>
          </div>

          {/* Specifications */}
          <div className="text-xs text-gray-600">
            <div>
              {product.specifications.grade} • {product.specifications.standard}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Price and Actions */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-lg font-bold text-rawasy-600">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {product.unit}
                  </span>
                </div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <div className="text-xs text-gray-500">
                  الحد الأدنى: {product.minOrder} {product.unit}
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleAddToCart(product.id)}
              disabled={!product.inStock}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 ml-2" />
              {product.inStock ? "أضف للسلة" : "غير متوفر"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                الرئيسية
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link
                href="/categories"
                className="text-gray-500 hover:text-gray-700"
              >
                الفئات
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">حديد وصلب</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  حديد وصلب
                </h1>
                <p className="text-gray-600">
                  {products.length} منتج • حديد التسليح، الهياكل المعدنية،
                  الأنابيب المعدنية
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex rounded-lg border border-gray-300">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-rawasy-50 text-rawasy-600" : "text-gray-400"}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-rawasy-50 text-rawasy-600" : "text-gray-400"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="popular">الأكثر شيوعاً</option>
                  <option value="price-low">السعر: من الأقل للأ��لى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="rating">التقييم</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <div className="w-64 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">المرشحات</h3>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4 ml-1" />
                    تصفية
                  </Button>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">نطاق السعر</h4>
                  <div className="space-y-2">
                    {filters.priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          className="h-4 w-4 text-rawasy-600 ml-2"
                        />
                        <span className="text-sm text-gray-700">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Suppliers */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">الموردون</h4>
                  <div className="space-y-2">
                    {filters.suppliers.map((supplier, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-rawasy-600 ml-2"
                        />
                        <span className="text-sm text-gray-700">
                          {supplier}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">الت��ييم</h4>
                  <div className="space-y-2">
                    {filters.ratings.map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          className="h-4 w-4 text-rawasy-600 ml-2"
                        />
                        <div className="flex items-center">
                          {[...Array(rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 text-yellow-400 fill-current"
                            />
                          ))}
                          <span className="text-sm text-gray-700 mr-1">
                            فأكثر
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-rawasy-600 ml-2"
                    />
                    <span className="text-sm text-gray-700">المتوفر فقط</span>
                  </label>
                </div>
              </div>

              {/* Products Grid/List */}
              <div className="flex-1">
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isListView={viewMode === "list"}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button variant="outline" size="sm">
                      السابق
                    </Button>
                    <Button size="sm">1</Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      التالي
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
