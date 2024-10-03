"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const copyToClipboardWithMeta = async (value, event) => {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
};

const CopyButton = ({ value, className, src, variant, event, setReportMessage, ...props }) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn("relative z-10 flex items-center justify-center p-2 [&_svg]:size-full", className)}
      onClick={() => {
        setReportMessage(value);
        copyToClipboardWithMeta(value, event);
        setHasCopied(true);
      }}
      {...props}
    >
      <TooltipProvider>
        <Tooltip>
          <span className="sr-only">Copy</span>
          <TooltipTrigger asChild>{hasCopied ? <CheckIcon /> : <CopyIcon />}</TooltipTrigger>
          <TooltipContent>Click to copy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Button>
  );
};

export { CopyButton };
