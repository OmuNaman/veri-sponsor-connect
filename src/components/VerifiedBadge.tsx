
import { Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type VerifiedBadgeProps = {
  size?: "sm" | "md" | "lg";
  withTooltip?: boolean;
};

const VerifiedBadge = ({ size = "md", withTooltip = true }: VerifiedBadgeProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 text-[8px]",
    md: "h-5 w-5 text-[10px]",
    lg: "h-6 w-6 text-xs",
  };

  const badge = (
    <div 
      className={`inline-flex items-center justify-center rounded-full bg-verisponsor-green text-white ${sizeClasses[size]}`}
      aria-label="Verified"
    >
      <Check className="h-3 w-3" />
    </div>
  );

  if (withTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>Verified Account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return badge;
};

export default VerifiedBadge;
