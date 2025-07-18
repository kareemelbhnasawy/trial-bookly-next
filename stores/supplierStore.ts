import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  minOrder: number;
  stockQuantity: number;
  category: string;
  subcategory: string;
  specifications: {
    grade: string;
    standard: string;
    [key: string]: string;
  };
  images: string[];
  status: "active" | "inactive" | "out_of_stock";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
  }[];
  total: number;
  status:
    | "new"
    | "accepted"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: string;
  estimatedDelivery?: string;
  notes?: string;
}

export interface SupplierProfile {
  id: string;
  companyName: string;
  companyNameEn: string;
  description: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  tradeLicense: string;
  taxId?: string;
  categories: string[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

interface SupplierStore {
  profile: SupplierProfile | null;
  products: Product[];
  orders: SupplierOrder[];

  // Profile actions
  setProfile: (profile: SupplierProfile) => void;
  updateProfile: (updates: Partial<SupplierProfile>) => void;

  // Product actions
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => string;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;

  // Order actions
  updateOrderStatus: (orderId: string, status: SupplierOrder["status"]) => void;
  getOrderStats: () => {
    total: number;
    new: number;
    processing: number;
    shipped: number;
    delivered: number;
  };

  // Analytics
  getSalesStats: () => {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    topProducts: {
      productId: string;
      productName: string;
      quantity: number;
      revenue: number;
    }[];
  };
}

export const useSupplierStore = create<SupplierStore>()(
  persist(
    (set, get) => ({
      profile: null,
      products: [],
      orders: [],

      setProfile: (profile) => {
        set({ profile });
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        }));
      },

      addProduct: (productData) => {
        const productId = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = new Date().toISOString();

        const product: Product = {
          ...productData,
          id: productId,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          products: [...state.products, product],
        }));

        return productId;
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date().toISOString() }
              : product,
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      getProduct: (id) => {
        return get().products.find((product) => product.id === id);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order,
          ),
        }));
      },

      getOrderStats: () => {
        const orders = get().orders;
        return {
          total: orders.length,
          new: orders.filter((o) => o.status === "new").length,
          processing: orders.filter((o) =>
            ["accepted", "processing"].includes(o.status),
          ).length,
          shipped: orders.filter((o) => o.status === "shipped").length,
          delivered: orders.filter((o) => o.status === "delivered").length,
        };
      },

      getSalesStats: () => {
        const orders = get().orders.filter((o) => o.status === "delivered");
        const totalRevenue = orders.reduce(
          (sum, order) => sum + order.total,
          0,
        );
        const totalOrders = orders.length;
        const averageOrderValue =
          totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calculate top products
        const productSales = new Map<
          string,
          { name: string; quantity: number; revenue: number }
        >();

        orders.forEach((order) => {
          order.items.forEach((item) => {
            const existing = productSales.get(item.productId) || {
              name: item.productName,
              quantity: 0,
              revenue: 0,
            };
            productSales.set(item.productId, {
              name: item.productName,
              quantity: existing.quantity + item.quantity,
              revenue: existing.revenue + item.price * item.quantity,
            });
          });
        });

        const topProducts = Array.from(productSales.entries())
          .map(([productId, data]) => ({
            productId,
            productName: data.name,
            ...data,
          }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        return {
          totalRevenue,
          totalOrders,
          averageOrderValue,
          topProducts,
        };
      },
    }),
    {
      name: "rawasy-supplier",
      partialize: (state) => ({
        profile: state.profile,
        products: state.products,
        orders: state.orders,
      }),
    },
  ),
);

// Sample data for demonstration
export const initializeSampleSupplierData = () => {
  const { setProfile, addProduct, orders } = useSupplierStore.getState();

  // Sample profile
  const sampleProfile: SupplierProfile = {
    id: "supplier_1",
    companyName: "شركة الخليج للحديد والصلب",
    companyNameEn: "Gulf Steel & Iron Company",
    description:
      "نحن شركة متخصصة في توريد مواد البناء عالية الجودة منذ أكثر من 20 عاماً",
    contactPerson: "أحمد محمد العلي",
    email: "info@gulfsteel.com",
    phone: "+966 11 234 5678",
    address: "شارع الملك فهد، حي العليا",
    city: "الرياض",
    region: "منطقة الرياض",
    tradeLicense: "1010123456",
    taxId: "300123456700003",
    categories: ["حديد وصلب", "مواد معدنية"],
    verified: true,
    rating: 4.8,
    reviewCount: 245,
    createdAt: "2022-01-15T10:00:00.000Z",
  };

  setProfile(sampleProfile);

  // Sample products
  const sampleProducts = [
    {
      name: "حديد تسليح 16 مم",
      nameEn: "Rebar 16mm",
      description: "حديد تسليح عالي الجودة مطابق للمواصفات السعودية والدولية",
      price: 2850,
      originalPrice: 3000,
      unit: "طن",
      minOrder: 1,
      stockQuantity: 500,
      category: "حديد وصلب",
      subcategory: "حديد ال��سليح",
      specifications: {
        grade: "الدرجة 60",
        standard: "ASTM A615",
        length: "12 متر",
        diameter: "16 مم",
      },
      images: ["/products/rebar-16mm-1.jpg", "/products/rebar-16mm-2.jpg"],
      status: "active" as const,
      featured: true,
    },
    {
      name: "أنابيب معدنية مجلفنة 4 بوصة",
      nameEn: "Galvanized Steel Pipes 4 inch",
      description:
        "أنابيب معدنية مجلفنة مقاومة للتآكل مناسبة للاستخدامات المختلفة",
      price: 45,
      unit: "متر",
      minOrder: 50,
      stockQuantity: 1000,
      category: "حديد وصلب",
      subcategory: "أنابيب معدنية",
      specifications: {
        grade: "مجلفن حار",
        standard: "BS 1387",
        thickness: "3.2 مم",
        diameter: "4 بوصة",
      },
      images: ["/products/galvanized-pipes-1.jpg"],
      status: "active" as const,
      featured: false,
    },
    {
      name: "ألواح معدنية مموجة",
      nameEn: "Corrugated Metal Sheets",
      description: "ألواح معدنية مموجة خفيفة الوزن ومقاومة للطقس",
      price: 85,
      unit: "متر مربع",
      minOrder: 100,
      stockQuantity: 2000,
      category: "حديد وصلب",
      subcategory: "ألواح معدنية",
      specifications: {
        grade: "مجلفن",
        thickness: "0.5 مم",
        width: "1 متر",
        length: "3 متر",
      },
      images: ["/products/corrugated-sheets-1.jpg"],
      status: "active" as const,
      featured: true,
    },
  ];

  sampleProducts.forEach((product) => addProduct(product));

  // Sample orders
  const sampleOrders: SupplierOrder[] = [
    {
      id: "order_1",
      orderNumber: "RWS123456001",
      customerName: "محمد عبدالله السعد",
      customerPhone: "+966 50 123 4567",
      customerAddress: "حي الملك فيصل، الرياض",
      items: [
        {
          productId: "product_1",
          productName: "حديد تسليح 16 مم",
          quantity: 5,
          price: 2850,
          unit: "طن",
        },
      ],
      total: 14250,
      status: "new",
      createdAt: new Date().toISOString(),
      notes: "يرجى التأكد من جودة المنتج قبل التوصيل",
    },
    {
      id: "order_2",
      orderNumber: "RWS123456002",
      customerName: "خالد أحمد العتيبي",
      customerPhone: "+966 55 234 5678",
      customerAddress: "حي النخيل، جدة",
      items: [
        {
          productId: "product_2",
          productName: "أنابيب معدنية مجلفنة 4 بوصة",
          quantity: 200,
          price: 45,
          unit: "متر",
        },
      ],
      total: 9000,
      status: "processing",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ];

  // Set orders directly since there's no addOrder method
  useSupplierStore.setState({ orders: sampleOrders });
};
