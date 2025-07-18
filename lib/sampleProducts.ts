import type { CartItem } from "@/stores/cartStore";

export const sampleProducts: Omit<CartItem, "quantity">[] = [
  {
    id: "1",
    name: "حديد تسليح 16 مم",
    nameEn: "Rebar 16mm",
    price: 850,
    originalPrice: 900,
    unit: "طن",
    minOrder: 1,
    image: "/products/rebar-16mm.jpg",
    supplier: {
      name: "شركة الخليج للحديد",
      location: "القاهرة",
      verified: true,
    },
    specifications: {
      grade: "الدرجة 60",
      standard: "ASTM A615",
      length: "12 متر",
    },
  },
  {
    id: "2",
    name: "حديد تسليح 12 مم",
    nameEn: "Rebar 12mm",
    price: 780,
    unit: "طن",
    minOrder: 1,
    image: "/products/rebar-12mm.jpg",
    supplier: {
      name: "مؤسسة الحديد المتطور",
      location: "الجيزة",
      verified: true,
    },
    specifications: {
      grade: "الدرجة 60",
      standard: "ASTM A615",
      length: "12 متر",
    },
  },
  {
    id: "3",
    name: "أنابيب معدنية مجلفنة 4 بوصة",
    nameEn: "Galvanized Steel Pipes 4 inch",
    price: 35,
    originalPrice: 40,
    unit: "متر",
    minOrder: 50,
    image: "/products/galvanized-pipes.jpg",
    supplier: {
      name: "شركة الأنابيب الذهبية",
      location: "الإسكندرية",
      verified: true,
    },
    specifications: {
      grade: "مجلفن حار",
      standard: "BS 1387",
      thickness: "3.2 مم",
    },
  },
  {
    id: "4",
    name: "اسمنت بورتلاند عادي",
    nameEn: "Portland Cement",
    price: 120,
    unit: "شيكارة",
    minOrder: 10,
    image: "/products/cement.jpg",
    supplier: {
      name: "مصنع الاسمنت المصري",
      location: "حلوان",
      verified: true,
    },
    specifications: {
      grade: "CEM I 42.5N",
      standard: "ESS 4756-1",
      weight: "50 كيلو",
    },
  },
  {
    id: "5",
    name: "رمل أبيض ناعم",
    nameEn: "Fine White Sand",
    price: 80,
    unit: "متر مكعب",
    minOrder: 5,
    image: "/products/sand.jpg",
    supplier: {
      name: "محاجر الرمل الذهبي",
      location: "أسوان",
      verified: true,
    },
    specifications: {
      grade: "ناعم",
      standard: "ESS 1109",
      size: "0.5-2 مم",
    },
  },
  {
    id: "6",
    name: "طوب أحمر طفلي",
    nameEn: "Red Clay Bricks",
    price: 0.8,
    unit: "قطعة",
    minOrder: 1000,
    image: "/products/red-bricks.jpg",
    supplier: {
      name: "مصنع الطوب الأحمر",
      location: "بني سويف",
      verified: true,
    },
    specifications: {
      grade: "درجة أولى",
      standard: "ESS 1524",
      dimensions: "25×12×6.5 سم",
    },
  },
  {
    id: "7",
    name: "بلوك خرساني أجوف",
    nameEn: "Hollow Concrete Blocks",
    price: 4.5,
    unit: "قطعة",
    minOrder: 500,
    image: "/products/concrete-blocks.jpg",
    supplier: {
      name: "مصنع البلوك الحديث",
      location: "القاهرة الجديدة",
      verified: true,
    },
    specifications: {
      grade: "M7.5",
      standard: "ESS 1524",
      dimensions: "40×20×20 سم",
    },
  },
  {
    id: "8",
    name: "أنابيب PVC للصرف 110 مم",
    nameEn: "PVC Drainage Pipes 110mm",
    price: 22,
    unit: "متر",
    minOrder: 20,
    image: "/products/pvc-pipes.jpg",
    supplier: {
      name: "شركة البلاستيك المتطور",
      location: "العبور",
      verified: true,
    },
    specifications: {
      grade: "SN4",
      standard: "ESS EN 1401",
      thickness: "3.2 مم",
    },
  },
];

export const getProductById = (
  id: string,
): Omit<CartItem, "quantity"> | undefined => {
  return sampleProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (
  category: string,
): Omit<CartItem, "quantity">[] => {
  // Simple category mapping - in a real app this would be more sophisticated
  const categoryMap: Record<string, string[]> = {
    steel: ["1", "2", "3"],
    cement: ["4"],
    aggregates: ["5"],
    masonry: ["6", "7"],
    plumbing: ["8"],
  };

  const productIds = categoryMap[category] || [];
  return sampleProducts.filter((product) => productIds.includes(product.id));
};
