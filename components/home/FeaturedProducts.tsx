"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useCartStore } from "@/stores/cartStore";
import { sampleProducts } from "@/lib/sampleProducts";
import { formatPrice } from "@/lib/utils";

export default function FeaturedProducts() {
  const { addItem, getItemCount, updateQuantity } = useCartStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Get first 6 products as featured
  const featuredProducts = sampleProducts.slice(0, 6);

  const getQuantity = (productId: string): number => {
    return quantities[productId] || 1;
  };

  const setQuantity = (productId: string, quantity: number) => {
    const product = sampleProducts.find((p) => p.id === productId);
    if (product) {
      const minQuantity = Math.max(1, product.minOrder);
      setQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(minQuantity, quantity),
      }));
    }
  };

  const handleAddToCart = (product: (typeof sampleProducts)[0]) => {
    const quantity = getQuantity(product.id);
    addItem(product, quantity);

    // Show success message (you could use a toast here)
    console.log(`تم إضافة ${product.name} إلى السلة`);
  };

  const isInCart = (productId: string): boolean => {
    return getItemCount(productId) > 0;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            المنتجات المميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            تصفح أفضل المنتجات المختارة بعناية من موردينا الموثوقين
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">صورة المنتج</span>
                </div>

                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    خصم{" "}
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100,
                    )}
                    %
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-2 left-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Link href={`/products/${product.id}`}>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Supplier Info */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {product.supplier.name}
                    </div>
                    {product.supplier.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        موثق
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

                  {/* Price */}
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
                      {product.minOrder > 1 && (
                        <div className="text-xs text-gray-500">
                          الحد الأدنى: {product.minOrder} {product.unit}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setQuantity(product.id, getQuantity(product.id) - 1)
                        }
                        disabled={getQuantity(product.id) <= product.minOrder}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-center min-w-[3rem] py-2 font-medium">
                        {getQuantity(product.id)}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setQuantity(product.id, getQuantity(product.id) + 1)
                        }
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.unit}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 ml-2" />
                    {isInCart(product.id) ? "أضف المزيد" : "أضف للسلة"}
                  </Button>

                  {isInCart(product.id) && (
                    <div className="text-xs text-green-600 text-center">
                      ✓ في السلة ({getItemCount(product.id)} {product.unit})
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <Link href="/categories">
            <Button size="lg" variant="outline">
              عرض جميع المنتجات
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
