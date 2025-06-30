import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  unique_name: string;
  UserId: string;
  permission: string[];
};

export function getUserid(): string | null {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.UserId || null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}