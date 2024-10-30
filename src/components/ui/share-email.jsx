import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const ShareEmail = ({ body, variant }) => {
  const handleShare = () => {
    const defaultSubject = `Daily Report - ${new Date().toLocaleDateString("id-ID")}`;
    const defaultBody = "Hello there";

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(body ? body : defaultBody)}`;

    window.open(gmailLink, "_blank");
  };

  return (
    <Button variant={variant} onClick={handleShare} className="w-full">
      <Mail className="xs:mr-2 xs:size-4 size-full" />
      <span className="max-xs:hidden">Send to GMail</span>
    </Button>
  );
};

export { ShareEmail };
