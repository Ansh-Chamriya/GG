"use client";

import React from "react";
import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";
import { EmptyState } from "@/app/components/dashboard/shared";

export function WorkOrderEmpty() {
  return (
    <div className="card p-8 h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={<ClipboardList className="w-8 h-8" />}
        title="No work orders"
        description="Get started by creating a new work order or check your filters."
        action={
          <Link href="/dashboard/work-orders/new" className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Create Work Order
          </Link>
        }
      />
    </div>
  );
}
