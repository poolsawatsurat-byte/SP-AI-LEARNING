"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiRefreshLine } from "@remixicon/react";
import type { AdminOrderItem } from "@/types/admin.types";

const statusMap: Record<string, { label: string; variant: "default" | "success" | "warning" | "info" }> = {
  delivered: { label: "จัดส่งแล้ว", variant: "success" },
  received: { label: "ได้รับแล้ว", variant: "info" },
  processing: { label: "กำลังดำเนินการ", variant: "warning" },
};

type RecentOrdersTableProps = {
  orders: AdminOrderItem[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

function RecentOrdersTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function RecentOrdersTable({ orders, loading, error, onRetry }: RecentOrdersTableProps) {
  if (loading) {
    return <RecentOrdersTableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-destructive">
        <p className="text-sm">{error}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RiRefreshLine className="size-4" />
            ลองใหม่
          </Button>
        )}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>คำสั่งซื้อ</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>ยอดรวม</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>วันที่</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              ไม่มีคำสั่งซื้อล่าสุด
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => {
            const status = statusMap[order.status] ?? { label: order.status, variant: "default" as const };
            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">#{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(order.total)}
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("th-TH")}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export { RecentOrdersTable };
