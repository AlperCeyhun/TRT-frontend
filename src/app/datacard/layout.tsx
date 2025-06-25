"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserPermissions } from "@/lib/user/getUserPermissions";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const permissions = getUserPermissions();
    const requiredEditPermissions = [
      "Edit Task Title",
      "Edit Task Description",
      "Edit Task Status",
      "Edit Task Assignees",
    ];
    const hasAllEditPermissions = requiredEditPermissions.every((perm) =>
      permissions.includes(perm)
    );

    if (!hasAllEditPermissions) {
      router.replace("/unauthorized");
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, []);

  if (loading) return null;
  if (!authorized) return null;
  return <>{children}</>;
}