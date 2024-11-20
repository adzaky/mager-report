import { Button } from "@/components/ui/button";
import { useReportUtilities } from "@/features/formatter/hooks/useReportUtilities";
import { FaWhatsapp } from "react-icons/fa";

const SendWhatsapp = ({ body, variant }) => {
  const { sendToWhatsapp } = useReportUtilities();

  return (
    <Button
      variant={variant}
      onClick={(e) => {
        e.stopPropagation();
        sendToWhatsapp(body);
      }}
      className="w-full"
    >
      <FaWhatsapp className="sm:mr-2 sm:size-4 size-full" />
      <span className="max-sm:hidden">Send to Whatsapp</span>
    </Button>
  );
};

export { SendWhatsapp };
