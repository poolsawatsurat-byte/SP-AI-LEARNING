"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiRefreshLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

type KpiCardProps = {
  title: string;
  value: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

function KpiCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

function KpiCard({ title, value, loading, error, onRetry }: KpiCardProps) {
  if (loading) {
    return <KpiCardSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 text-destructive">
            <p className="text-sm">{error}</p>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RiRefreshLine className="size-4" />
                ลองใหม่
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

export { KpiCard, KpiCardSkeleton };
