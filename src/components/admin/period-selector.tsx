"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminPeriod } from "@/types/admin.types";

type PeriodSelectorProps = {
  value: AdminPeriod;
  onChange: (period: AdminPeriod) => void;
};

const periods: { label: string; value: AdminPeriod }[] = [
  { label: "7 วัน", value: "7d" },
  { label: "30 วัน", value: "30d" },
  { label: "90 วัน", value: "90d" },
];

function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-secondary p-1">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant="ghost"
          size="sm"
          className={cn(
            "text-muted-foreground",
            value === period.value && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          )}
          onClick={() => onChange(period.value)}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}

export { PeriodSelector };
