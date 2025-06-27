"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { getUsers, User as ApiUser } from "@/lib/user/getusers";
import { getUserClaim } from "@/lib/claim/getUserClaim";
import { Claim, getAllClaim } from "@/lib/claim/getAllClaim";
import { assignClaim } from "@/lib/claim/assignClaim";
import { removeClaim } from "@/lib/claim/removeClaim";
import { toast } from "sonner";
import { deleteUser } from "@/lib/user/deleteUser";
import { UserActionsCell } from "@/components/dashboard/UserActionsCell";

interface UserWithClaim {
  id: number;
  username: string;
  claims: string[];
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserWithClaim[]>([]);
  const [claimInputs, setClaimInputs] = useState<Record<number, string>>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [loading, setLoading] = useState(true);
  const [allClaims, setAllClaims] = useState<Claim[]>([]);

  const t = useTranslations("dashboard");

  useEffect(() => {
    async function fetchUsersAndClaims() {
      setLoading(true);
      try {
        const apiUsers = await getUsers();
        // Filter out user with id 1
        const filteredUsers = apiUsers.filter((user) => user.id !== 1);
        const usersWithClaims: UserWithClaim[] = await Promise.all(
          filteredUsers.map(async (user) => {
            const claims: Claim[] = await getUserClaim(user.id);
            return {
              id: user.id,
              username: user.username,
              claims: claims.map((c) => c.claimName),
            };
          })
        );
        setUsers(usersWithClaims);

        // Fetch all claims for the dropdown
        const claimsList = await getAllClaim();
        setAllClaims(claimsList);
      } catch (e) {
        setUsers([]);
        setAllClaims([]);
        toast.error("Failed to fetch users or claims.");
      }
      setLoading(false);
    }
    fetchUsersAndClaims();
  }, []);

  const HandledeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success("User deleted successfully.");
    } catch (e) {
      toast.error("Failed to delete user.");
    }
  };

  const toggleClaim = async (userId: number, claimName: string) => {
    if (!claimName.trim()) return;
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const claimObj = allClaims.find((c) => c.claimName === claimName);
    if (!claimObj) {
      toast.error("Claim not found.");
      return;
    }

    const hasClaim = user.claims.includes(claimName);

    try {
      if (hasClaim) {
        await removeClaim(userId, claimObj.id);
      } else {
        await assignClaim(userId, claimObj.id);
      }
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === userId) {
            return {
              ...u,
              claims: hasClaim
                ? u.claims.filter((c) => c !== claimName)
                : [...u.claims, claimName],
            };
          }
          return u;
        })
      );
      setClaimInputs((prev) => ({ ...prev, [userId]: "" }));
    } catch (e) {
      toast.error(
        hasClaim
          ? t("error_remove_claim")
          : t("error_assign_claim")
      );
    }
  };

  const columns: ColumnDef<UserWithClaim>[] = [
    {
      accessorKey: "username",
      header: t("username"),
      cell: ({ row }) => <span>{row.original.username}</span>,
    },
    {
      accessorKey: "claims",
      header: t("claims"),
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.claims.map((claim) => (
            <span
              key={`${row.original.id}-${claim}`}
              className="px-2 py-1 text-xs bg-muted rounded text-black"
            >
              {claim}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-100">{t("actions")}</div>,
      cell: ({ row }) => {
        const userId = row.original.id;
        const claimValue = claimInputs[userId] ?? "";

        return (
          <UserActionsCell
            userId={userId}
            claimValue={claimValue}
            allClaims={allClaims}
            onClaimChange={(id, val) => {
              setClaimInputs((prev) => ({ ...prev, [id]: val }));
            }}
            onToggleClaim={toggleClaim}
            onDeleteUser={HandledeleteUser}
            disabled={!claimValue.trim()}
            t={t}
          />
        );
      },
    }
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
      <Card className="p-4 space-y-4 bg-black">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-white">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-white">
                    {t("no_user_title")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}