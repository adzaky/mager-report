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
    <Button
      variant={variant}
      onClick={(e) => {
        e.stopPropagation();
        handleShare(body);
      }}
      className="w-full"
    >
      <Mail className="sm:mr-2 sm:size-4 size-full" />
      <span className="max-sm:hidden">Send to GMail</span>
    </Button>
  );
};

export { ShareEmail };
