import { useReportUtilities } from "@/features/formatter/hooks/useReportUtilities";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

const SendWhatsapp = ({ body, variant, className }) => {
  const { sendToWhatsapp } = useReportUtilities();

  return (
    <Button
      variant={variant}
      onClick={() => {
        sendToWhatsapp(body);
      }}
      className={cn("flex w-full items-center justify-center gap-2 p-2", className)}
    >
      <FaWhatsapp className="size-full sm:size-4" />
      <span className="max-sm:hidden">Send to Whatsapp</span>
    </Button>
  );
};

export { SendWhatsapp };
