import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    nameEn: string;
    icon: LucideIcon;
    image: string;
    itemCount: number;
    href: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon;

  return (
    <Link href={category.href} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        <div className="relative">
          {/* Background Image */}
          <div className="aspect-[4/3] bg-gradient-to-br from-rawasy-100 to-rawasy-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-rawasy-600/10"></div>

            {/* Icon */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 group-hover:bg-white transition-colors">
              <IconComponent className="h-8 w-8 text-rawasy-600" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-rawasy-600/20 rounded-full -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rawasy-400/30 rounded-full"></div>
          </div>

          {/* Content */}
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-rawasy-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">{category.nameEn}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-600">
                  {category.itemCount.toLocaleString("ar-SA")} منتج
                </span>
                <div className="flex items-center text-rawasy-600 group-hover:text-rawasy-700 transition-colors">
                  <span className="text-sm font-medium">ت��فح</span>
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
        </div>
      </Card>
    </Link>
  );
}
