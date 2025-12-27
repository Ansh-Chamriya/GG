"use client";

import Link from "next/link";
import { Settings, Plus } from "lucide-react";
import { EmptyState } from "@/app/components/dashboard/shared";

export function EquipmentEmpty() {
  return (
    <div className="card p-8">
      <EmptyState
        icon={<Settings className="w-8 h-8" />}
        title="No equipment found"
        description="Add your first equipment or try adjusting your search filters."
        action={
          <Link href="/dashboard/equipment/new" className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Equipment
          </Link>
        }
      />
    </div>
  );
}
