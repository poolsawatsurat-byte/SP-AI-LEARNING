"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { KpiCard } from "@/components/admin/kpi-card";
import { PeriodSelector } from "@/components/admin/period-selector";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import type { AdminStats, RevenuePoint, AdminOrderItem, AdminPeriod } from "@/types/admin.types";

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((mod) => mod.RevenueChart),
  { ssr: false }
);

const currencyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);
  const [period, setPeriod] = useState<AdminPeriod>("30d");

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        setStatsError(null);
        const res = await fetch("/api/admin/stats");
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลสถิติได้");
        const data: AdminStats = await res.json();
        if (!cancelled) setStats(data);
      } catch (err) {
        if (!cancelled) setStatsError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      } finally {
        if (!cancelled) setStatsLoading(false);
      }
    }

    async function loadOrders() {
      try {
        setOrdersError(null);
        const res = await fetch("/api/admin/orders?limit=5");
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
        const data = await res.json();
        if (!cancelled) setOrders(data.orders);
      } catch (err) {
        if (!cancelled) setOrdersError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      } finally {
        if (!cancelled) setOrdersLoading(false);
      }
    }

    loadStats();
    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRevenue() {
      try {
        setRevenueLoading(true);
        setRevenueError(null);
        const res = await fetch(`/api/admin/revenue?period=${period}`);
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลรายได้ได้");
        const data: RevenuePoint[] = await res.json();
        if (!cancelled) setRevenue(data);
      } catch (err) {
        if (!cancelled) setRevenueError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      } finally {
        if (!cancelled) setRevenueLoading(false);
      }
    }

    loadRevenue();

    return () => {
      cancelled = true;
    };
  }, [period]);

  useEffect(() => {
    const interval = setInterval(() => {
      async function refresh() {
        try {
          const [statsRes, ordersRes] = await Promise.all([
            fetch("/api/admin/stats"),
            fetch("/api/admin/orders?limit=5"),
          ]);

          if (statsRes.ok) {
            const statsData: AdminStats = await statsRes.json();
            setStats(statsData);
            setStatsError(null);
          }

          if (ordersRes.ok) {
            const ordersData = await ordersRes.json();
            setOrders(ordersData.orders);
            setOrdersError(null);
          }
        } catch {
          setStatsError("ไม่สามารถโหลดข้อมูลได้");
        }
      }

      refresh();
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const handlePeriodChange = (newPeriod: AdminPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">แดชบอร์ด</h1>
          <PeriodSelector value={period} onChange={handlePeriodChange} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="ยอดขายวันนี้"
            value={stats ? currencyFormatter.format(stats.todaySales) : ""}
            loading={statsLoading}
            error={statsError}
            onRetry={() => {
              setStatsLoading(true);
              setStatsError(null);
              fetch("/api/admin/stats")
                .then((r) => r.json())
                .then((d: AdminStats) => setStats(d))
                .catch((e: Error) => setStatsError(e.message))
                .finally(() => setStatsLoading(false));
            }}
          />
          <KpiCard
            title="คำสั่งซื้อวันนี้"
            value={stats ? String(stats.todayOrders) : ""}
            loading={statsLoading}
            error={statsError}
          />
          <KpiCard
            title="คำสั่งซื้อที่รอดำเนินการ"
            value={stats ? String(stats.pendingOrders) : ""}
            loading={statsLoading}
            error={statsError}
          />
          <KpiCard
            title="สินค้าทั้งหมด"
            value={stats ? String(stats.totalProducts) : ""}
            loading={statsLoading}
            error={statsError}
          />
        </div>

        <RevenueChart
          data={revenue}
          loading={revenueLoading}
          error={revenueError}
          onRetry={() => {
            setRevenueLoading(true);
            setRevenueError(null);
            fetch(`/api/admin/revenue?period=${period}`)
              .then((r) => r.json())
              .then((d: RevenuePoint[]) => setRevenue(d))
              .catch((e: Error) => setRevenueError(e.message))
              .finally(() => setRevenueLoading(false));
          }}
        />

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-base font-semibold">คำสั่งซื้อล่าสุด</h2>
          <RecentOrdersTable
            orders={orders}
            loading={ordersLoading}
            error={ordersError}
            onRetry={() => {
              setOrdersLoading(true);
              setOrdersError(null);
              fetch("/api/admin/orders?limit=5")
                .then((r) => r.json())
                .then((d) => setOrders(d.orders))
                .catch((e: Error) => setOrdersError(e.message))
                .finally(() => setOrdersLoading(false));
            }}
          />
        </div>
      </div>
    </div>
  );
}
