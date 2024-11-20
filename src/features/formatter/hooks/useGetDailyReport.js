import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { dailyReportService } from "@/services/daily-report";

export const useGetDailyReport = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDailyReport = async () => {
      setLoading(true);

      try {
        const res = await dailyReportService.getReports();
        if (res.status === "success") {
          setData(res.data);
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

    getDailyReport();
  }, [toast]);

  return { loading, data };
};
