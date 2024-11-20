import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { dailyReportService } from "@/services/daily-report";

export const useSubmitDailyReport = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitDailyReport = async (data) => {
    setLoading(true);
    try {
      const res = await dailyReportService.postReport(data);
      if (res.status === "success") {
        toast({
          description: res.message,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitDailyReport };
};
