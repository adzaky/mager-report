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
      <FaWhatsapp className="xs:mr-2 xs:size-4 size-full" />
      <span className="max-xs:hidden">Send to Whatsapp</span>
    </Button>
  );
};

export { SendWhatsapp };
