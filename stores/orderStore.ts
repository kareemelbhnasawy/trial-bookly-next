import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready_for_dispatch"
  | "in_transit"
  | "delivered"
  | "completed"
  | "cancelled"
  | "returned";

export interface OrderItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  quantity: number;
  unit: string;
  supplier: {
    id: string;
    name: string;
    location: string;
  };
  specifications: {
    grade: string;
    standard: string;
    [key: string]: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    region: string;
    postalCode?: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    location?: string;
  }[];
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;

  // Actions
  createOrder: (
    orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "timeline">,
  ) => string;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    description: string,
    location?: string,
  ) => void;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: () => Order[];
  setCurrentOrder: (order: Order | null) => void;

  // Order statistics
  getOrderStats: () => {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
}

const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `RWS${timestamp}${random}`;
};

const getStatusLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    pending: "في انتظار التأكيد",
    confirmed: "مؤكد",
    processing: "قيد التحضير",
    ready_for_dispatch: "جاهز للشحن",
    in_transit: "في الطريق",
    delivered: "تم التسليم",
    completed: "مكتمل",
    cancelled: "ملغي",
    returned: "مُرتجع",
  };
  return labels[status];
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      createOrder: (orderData) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const orderNumber = generateOrderNumber();
        const createdAt = new Date().toISOString();

        const order: Order = {
          ...orderData,
          id: orderId,
          orderNumber,
          createdAt,
          timeline: [
            {
              status: orderData.status,
              timestamp: createdAt,
              description: "تم إنشاء الطلب بنجاح",
            },
          ],
        };

        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }));

        return orderId;
      },

      updateOrderStatus: (orderId, status, description, location) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id === orderId) {
              const newTimelineEntry = {
                status,
                timestamp: new Date().toISOString(),
                description,
                location,
              };

              return {
                ...order,
                status,
                timeline: [...order.timeline, newTimelineEntry],
              };
            }
            return order;
          }),
        }));
      },

      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getUserOrders: () => {
        return get().orders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      },

      setCurrentOrder: (order) => {
        set({ currentOrder: order });
      },

      getOrderStats: () => {
        const orders = get().orders;
        return {
          total: orders.length,
          pending: orders.filter((o) =>
            ["pending", "confirmed", "processing"].includes(o.status),
          ).length,
          completed: orders.filter((o) => o.status === "completed").length,
          cancelled: orders.filter((o) =>
            ["cancelled", "returned"].includes(o.status),
          ).length,
        };
      },
    }),
    {
      name: "rawasy-orders",
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);

export { getStatusLabel };
