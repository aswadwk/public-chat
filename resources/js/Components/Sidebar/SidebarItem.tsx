import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Link } from "@inertiajs/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type SidebarItemProps = {
  label: string;
  icon: ReactNode;
  link: string;
  isActive?: boolean;
  children?: ReactNode;
  type?: "dropdown" | "link";
  darkMode?: boolean;
  sidebarExpanded?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({
  label,
  icon,
  link,
  isActive,
  sidebarExpanded,
}: SidebarItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <Link
          href={link}
          className={cn(
            buttonVariants({
              variant: isActive ? "default" : "ghost",
              size: "sm",
            }),
            "dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white justify-start",
            isActive ? "dark:bg-muted dark:text-white" : ""
          )}
        >
          <TooltipTrigger asChild>
            <span className="pr-3 dark:text-white">{icon}</span>
          </TooltipTrigger>
          {!sidebarExpanded && (
            <span
              className={`dark:bg-transparent dark:text-white dark:hover:bg-muted dark:hover:text-white text-xs ${
                !isActive ? "text-black dark:bg-muted" : ""
              }`}
            >
              {label}
            </span>
          )}
        </Link>
        {sidebarExpanded && (
          <TooltipContent side="right" className="mb-2">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItem;
