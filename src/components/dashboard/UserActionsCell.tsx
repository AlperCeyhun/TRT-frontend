// components/UserActionsCell.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandItem } from "@/components/ui/command";
import { Claim } from "@/lib/claim/getAllClaim";

interface Props {
  userId: number;
  claimValue: string;
  allClaims: Claim[];
  onClaimChange: (userId: number, value: string) => void;
  onToggleClaim: (userId: number, claimName: string) => void;
  onDeleteUser: (userId: number) => void;
  disabled: boolean;
  t: (key: string) => string;
}

export function UserActionsCell({
  userId,
  claimValue,
  allClaims,
  onClaimChange,
  onToggleClaim,
  onDeleteUser,
  disabled,
  t,
}: Props) {
  const [openClaimSelect, setOpenClaimSelect] = useState(false);

  return (
    <div className="flex gap-2 items-center justify-end text-white">
      <Popover open={openClaimSelect} onOpenChange={setOpenClaimSelect}>
        <PopoverTrigger asChild>
          <Input
            placeholder="Claim"
            className="h-8 w-54 cursor-pointer"
            value={claimValue}
            onChange={(e) => onClaimChange(userId, e.target.value)}
            onClick={() => setOpenClaimSelect(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-48">
          <Command>
            {allClaims.map((claim) => (
              <CommandItem
                key={claim.id}
                onSelect={() => {
                  onClaimChange(userId, claim.claimName);
                  setOpenClaimSelect(false);
                }}
              >
                {claim.claimName}
              </CommandItem>
            ))}
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        variant="secondary"
        className="h-8"
        onClick={() => onToggleClaim(userId, claimValue)}
        disabled={disabled}
      >
        {t("button_toggle_claim")}
      </Button>
      <Button
        variant="destructive"
        className="h-8"
        onClick={() => onDeleteUser(userId)}
      >
        {t("button_delete_user")}
      </Button>
    </div>
  );
}