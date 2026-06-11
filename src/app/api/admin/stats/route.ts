import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySalesPromise = prisma.orders.aggregate({
      where: {
        date: { gte: today },
        status: { not: "delivered" },
      },
      _sum: { total_amount: true },
    });

    const todayOrdersPromise = prisma.orders.count({
      where: { date: { gte: today } }},
    );

    const pendingOrdersPromise = prisma.orders.count({
      where: { status: { not: "delivered" } }},
    );

    const totalProductsPromise = prisma.products.count();

    const totalUsersPromise = prisma.user.count();

    const [
      todaySales,
      todayOrders,
      pendingOrders,
      totalProducts,
      totalUsers,
    ] = await Promise.all([
      todaySalesPromise,
      todayOrdersPromise,
      pendingOrdersPromise,
      totalProductsPromise,
      totalUsersPromise,
    ]);

    return NextResponse.json({
      todaySales: Number(todaySales._sum.total_amount || 0),
      todayOrders,
      pendingOrders,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}
