import Link from "next/link";
import { Star, MapPin, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface FeaturedSupplierProps {
  supplier: {
    id: string;
    name: string;
    nameEn: string;
    logo: string;
    rating: number;
    reviewCount: number;
    location: string;
    specialties: string[];
    verified: boolean;
    href: string;
  };
}

export default function FeaturedSupplier({ supplier }: FeaturedSupplierProps) {
  return (
    <Link href={supplier.href} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] h-full">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* Logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-rawasy-100 to-rawasy-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-rawasy-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {supplier.name.charAt(0)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-rawasy-600 transition-colors">
                  {supplier.name}
                </h3>
                <p className="text-sm text-gray-500">{supplier.nameEn}</p>
              </div>
            </div>

            {/* Verified Badge */}
            {supplier.verified && (
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                <Shield className="h-3 w-3 ml-1" />
                موثق
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(supplier.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {supplier.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({supplier.reviewCount} تقييم)
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 ml-1" />
            <span className="text-sm">{supplier.location}</span>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">التخصصات:</p>
            <div className="flex flex-wrap gap-1">
              {supplier.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rawasy-100 text-rawasy-800"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">عضو منذ 2022</span>
              <div className="flex items-center text-rawasy-600 group-hover:text-rawasy-700 transition-colors">
                <span className="text-sm font-medium">عرض المتجر</span>
                <svg
                  className="mr-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5m7-7l-7 7 7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
