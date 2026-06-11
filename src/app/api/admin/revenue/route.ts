import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30d";

    let startDate: Date;
    const endDate = new Date();

    switch (period) {
      case "7d":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "90d":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 90);
        break;
      case "30d":
      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
    }

    const orders = await prisma.orders.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
        status: "delivered",
      },
      select: {
        date: true,
        total_amount: true,
      },
    });

    const revenueMap = new Map<string, { revenue: number; orders: number }>();

    for (const order of orders) {
      const date = order.date;
      if (!date) continue;

      const dateStr = date.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      if (!revenueMap.has(dateStr)) {
        revenueMap.set(dateStr, { revenue: 0, orders: 0 });
      }

      const data = revenueMap.get(dateStr)!;
      data.revenue += Number(order.total_amount || 0);
      data.orders += 1;
    }

    const revenue = Array.from(revenueMap.entries())
      .map(([date, { revenue, orders }]) => ({ date, revenue, orders }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(revenue);
  } catch (error) {
    console.error("Error fetching admin revenue:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin revenue" },
      { status: 500 }
    );
  }
}
