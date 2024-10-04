"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/ui/copy-button";
import { ShareEmail } from "@/components/ui/share-email";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TimePicker from "./TimePicker";

const FormatReport = () => {
  const magerUserDetails = typeof localStorage !== "undefined" ? localStorage?.getItem("magerReportUserDetails") : null;
  const parsedDetails = magerUserDetails ? JSON.parse(magerUserDetails) : {};

  const form = useForm({
    defaultValues: {
      fullName: parsedDetails?.fullName || "",
      phoneNumber: parsedDetails?.phoneNumber || "",
      rememberMe: true,
      reportStatus: parsedDetails?.reportStatus || "Incomplete",
      tasks: parsedDetails?.tasks || [{ id: 1, description: "", startTime: "08:00", endTime: "09:00" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const watchReportStatus = form.watch("reportStatus");
  const watchTasks = form.watch("tasks");

  const formatPhoneNumber = (phoneNumber) => {
    const phoneNumberWithCountryCode = phoneNumber.startsWith("08") ? `62${phoneNumber.substring(1)}` : phoneNumber;
    return phoneNumberWithCountryCode;
  };

  const generateMessage = (data) => {
    const taskList = data.tasks
      .map(
        (task) =>
          `[${data.reportStatus === "Complete" ? "done" : "todo"}] ${task.description}${
            data.reportStatus === "Complete" ? ` (${task.startTime}-${task.endTime})` : ""
          }`
      )
      .join("\n");

    return `dailyreport\n${data.fullName}\n\n${data.reportStatus}:\n${taskList}`;
  };

  const handleSaveToLocalStorage = (data) => {
    localStorage.setItem(
      "magerReportUserDetails",
      JSON.stringify({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        reportStatus: data.reportStatus,
        tasks: data.tasks,
      })
    );
    alert("Data has been saved!");
  };

  const onSubmit = (data) => {
    if (data.rememberMe) {
      localStorage.setItem(
        "magerReportUserDetails",
        JSON.stringify({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
        })
      );
    }

    const message = generateMessage(data);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formatPhoneNumber(data.phoneNumber)}?text=${encodedMessage}`, "_blank");
  };

  const addTask = () => {
    const lastTask = watchTasks[watchTasks.length - 1];
    const newStartTime = lastTask ? lastTask.endTime : "08:00";

    const [hours, minutes] = newStartTime.split(":").map(Number);
    const newEndTimeDate = new Date(0, 0, 0, hours, minutes + 30);
    const newEndTime = `${newEndTimeDate.getHours().toString().padStart(2, "0")}:${newEndTimeDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    append({
      id: Date.now(),
      description: "",
      startTime: newStartTime,
      endTime: newEndTime,
    });
  };

  return (
    <Card className="mx-auto w-full rounded-2xl">
      <CardHeader className="md:mb-6 md:mt-4">
        <CardTitle className="text-base font-bold md:text-center md:text-2xl">
          Educourse Daily Report Formatter
        </CardTitle>
        <CardDescription className="md:text-center">
          Made by a{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="hover:underline">lazy person</TooltipTrigger>
              <TooltipContent>
                <Link href="https://github.com/adzaky" target="_blank" className="hover:underline">
                  @adzaky
                </Link>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{" "}
          for lazy people
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="628xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember Me</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reportStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Report Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Complete">Complete</SelectItem>
                      <SelectItem value="Incomplete">Incomplete</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Tasks</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2 rounded-md border p-4">
                  <FormField
                    control={form.control}
                    name={`tasks.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input placeholder={`Task ${index + 1}`} {...field} />
                            <Button type="button" variant="destructive" onClick={() => remove(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {watchReportStatus === "Complete" && (
                    <div className="flex flex-col gap-2 max-md:py-2 md:flex-row md:items-center">
                      <span className="max-md:text-center">Work Time:</span>
                      <div className="flex flex-col items-center justify-evenly md:ml-auto md:flex-row md:gap-2">
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.startTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TimePicker value={field.value} onChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <span className="text-lg">-</span>
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.endTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TimePicker value={field.value} onChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" className="w-full" onClick={addTask}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <div className="max-xs:flex-wrap flex w-full items-center gap-2">
              <ShareEmail variant="outline" body={generateMessage(form.getValues())} />
              <CopyButton
                type="button"
                variant="outline"
                value={generateMessage(form.getValues())}
                className="max-xs:w-full"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSaveToLocalStorage(form.getValues())}
            >
              <Save className="mr-2 size-4" />
              Save Data
            </Button>
            <Button type="submit" className="w-full">
              Send to WhatsApp
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormatReport;
