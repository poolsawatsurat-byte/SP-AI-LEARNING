import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5");

    const orders = await prisma.orders.findMany({
      take: limit,
      orderBy: { date: "desc" },
      include: {
        customers: true,
      },
    });

    const total = await prisma.orders.count();

    const formattedOrders = orders.map((order) => ({
      id: order.id.toString(),
      customerName: order.customers?.name || "Unknown",
      total: Number(order.total_amount || 0),
      status: order.status || "pending",
      createdAt: order.date?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({
      orders: formattedOrders,
      total,
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin orders" },
      { status: 500 }
    );
  }
}
