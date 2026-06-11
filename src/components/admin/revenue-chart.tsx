"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { RiRefreshLine } from "@remixicon/react";
import type { RevenuePoint } from "@/types/admin.types";

type RevenueChartProps = {
  data: RevenuePoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(value);

function RevenueChartSkeleton() {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
}

function RevenueChart({ data, loading, error, onRetry }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">รายได้</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <RevenueChartSkeleton />}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 py-8 text-destructive">
            <p className="text-sm">{error}</p>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RiRefreshLine className="size-4" />
                ลองใหม่
              </Button>
            )}
          </div>
        )}

        {!loading && !error && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--foreground)",
                }}
                formatter={(value) => [formatCurrency(Number(value)), "รายได้"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-4)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-4)", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export { RevenueChart };
