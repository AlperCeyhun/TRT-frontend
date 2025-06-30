import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./getUserid";

export function getUserPermissions(): string[] {
  try {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.permission || [];
  } catch (err) {
    console.error("Failed to decode token:", err);
    return [];
  }
}