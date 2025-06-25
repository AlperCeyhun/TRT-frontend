import { useEffect, useState } from "react";
import { getUserPermissions } from "./getUserPermissions";

export const useHasPermission = (required: string | string[]) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const permissions = getUserPermissions();

    if (Array.isArray(required)) {
      setHasPermission(required.some(p => permissions.includes(p)));
    } else {
      setHasPermission(permissions.includes(required));
    }
  }, [required]);

  return hasPermission;
};