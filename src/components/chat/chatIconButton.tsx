import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatIconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export const ChatIconButton: React.FC<ChatIconButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  ariaLabel,
}) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={onClick}
      className={cn(
        "rounded-full w-10 h-10 m-4 flex items-center justify-center",
        className
      )}
      aria-label={ariaLabel}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};