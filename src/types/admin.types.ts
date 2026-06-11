export type AdminPeriod = '7d' | '30d' | '90d';

export type AdminStats = {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
};

export type RevenuePoint = {
  date: string;
  revenue: number;
  orders: number;
};

export type AdminOrderItem = {
  id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
};

export type AdminOrdersResponse = {
  orders: AdminOrderItem[];
  total: number;
};
