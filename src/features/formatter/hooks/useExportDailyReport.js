import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { dailyReportService } from "@/services/daily-report";
import * as XLSX from "xlsx";

export const useExportDailyReport = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const exportDailyReport = async ({ title }) => {
    setLoading(true);
    try {
      const res = await dailyReportService.getMonthlyReports();
      if (res?.status === "success") {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(res?.data);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        XLSX.writeFile(workbook, `${title}.xlsx`);

        toast({
          description: "Export data successfully.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: err?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, exportDailyReport };
};
