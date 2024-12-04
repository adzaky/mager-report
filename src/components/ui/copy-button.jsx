"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

const copyToClipboardWithMeta = async (value, event) => {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
};

const CopyButton = ({ value, className, src, type, variant, event, ...props }) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      type={type}
      variant={variant}
      className={cn("flex w-full items-center justify-center gap-2 p-2", className)}
      onClick={() => {
        copyToClipboardWithMeta(value, event);
        setHasCopied(true);
      }}
      {...props}
    >
      {hasCopied ? <CheckIcon className="size-full sm:size-4" /> : <CopyIcon className="size-full sm:size-4" />}
      <span className="max-sm:hidden">Copy to Clipboard</span>
    </Button>
  );
};

export { CopyButton };
