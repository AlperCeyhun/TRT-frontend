"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserPermissions } from "@/lib/user/getUserPermissions";
import { requiredEditPermissions } from "@/lib/user/requiredEditPermissions";
import { checkAnyPermission } from "@/lib/user/checkAnyPermission";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const permissions = getUserPermissions();
    
    const hasAnyEditPermissions = checkAnyPermission(permissions,requiredEditPermissions);
    if (!hasAnyEditPermissions) {
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