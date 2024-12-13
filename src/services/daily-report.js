import { fetcher } from "@/lib/instance";

export const dailyReportService = {
  getReports() {
    return fetcher.get("/daily-report");
  },
  postReport(data) {
    return fetcher.post("/daily-report", data);
  },
  getMonthlyReports() {
    return fetcher.get("/daily-report/monthly");
  },
};
