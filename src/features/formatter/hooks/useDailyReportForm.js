import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export const useDailyReportForm = ({ userData = [], dailyReport = [] }) => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      rememberMe: true,
      reportStatus: "Incomplete",
      tasks: [{ id: 1, description: "", startTime: "08:00", endTime: "09:00" }],
    },
  });

  useEffect(() => {
    form.reset({
      fullName: userData[0]?.fullName || "",
      phoneNumber: userData[0]?.phoneNumber || "",
      rememberMe: true,
      reportStatus: dailyReport[0]?.reportStatus || "Incomplete",
      tasks: dailyReport[0]?.tasks || [{ id: 1, description: "", startTime: "08:00", endTime: "09:00" }],
    });
  }, [userData, dailyReport, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  return {
    form,
    fields,
    append,
    remove,
  };
};
