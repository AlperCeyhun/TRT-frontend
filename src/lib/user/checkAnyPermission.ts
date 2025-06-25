export function checkAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some((perm) => userPermissions.includes(perm));
}