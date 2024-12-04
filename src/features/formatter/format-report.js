"use client";
import { useSubmitUserData } from "./hooks/useSubmitUserData";
import { useGetUserData } from "./hooks/useGetUserData";
import { useSubmitDailyReport } from "./hooks/useSubmitDailyReport";
import { useGetDailyReport } from "./hooks/useGetDailyReport";
import { useDailyReportForm } from "./hooks/useDailyReportForm";
import { useTaskManager } from "./hooks/useTaskManager";
import { useReportUtilities } from "./hooks/useReportUtilities";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "@/components/ui/copy-button";
import { PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TimePicker from "@/components/ui/time-picker";
import { LoadingButton } from "@/components/ui/loading-button";
import { SendWhatsapp } from "@/components/ui/send-whatsapp";
import { SignedIn } from "@clerk/nextjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormatReport = () => {
  const { loading: postUserDataLoading, submitUserData } = useSubmitUserData();
  const { loading: getUserDataLoading, data: userData } = useGetUserData();

  const { loading: postReportLoading, submitDailyReport } = useSubmitDailyReport();
  const { loading: getReportLoading, data: dailyReport } = useGetDailyReport();

  const isLoading = getUserDataLoading || getReportLoading;

  const { form, fields, append, remove } = useDailyReportForm({
    userData: userData || [],
    dailyReport: dailyReport || [],
  });

  const { addTask } = useTaskManager(form.watch("tasks"), append);
  const { generateMessage } = useReportUtilities();

  const watchReportStatus = form.watch("reportStatus");

  const onSubmit = (data) => {
    if (!data) return;

    const userDetails = { fullName: data.fullName, phoneNumber: data.phoneNumber, rememberMe: data.rememberMe };
    submitUserData(userDetails);
    const tasks = data.tasks.map((task) => {
      return { description: task.description, startTime: task.startTime, endTime: task.endTime };
    });
    submitDailyReport({
      reportStatus: data.reportStatus,
      tasks,
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
      {isLoading ? (
        <Spinner size="large" className="my-8 h-96" />
      ) : (
        <div className="flex flex-col items-center gap-2 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <CardContent className="grid grid-cols-1 gap-4 p-2">
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
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex items-center gap-2"
                        >
                          <RadioGroupItem value="Complete" id="complete" />
                          <FormLabel htmlFor="complete" className="text-sm font-medium">
                            Complete
                          </FormLabel>
                          <RadioGroupItem value="Incomplete" id="incomplete" />
                          <FormLabel htmlFor="incomplete" className="text-sm font-medium">
                            Incomplete
                          </FormLabel>
                        </RadioGroup>
                      </FormControl>
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
              <CardFooter className="my-2 p-2">
                <SignedIn>
                  <LoadingButton type="submit" className="w-full" loading={postUserDataLoading || postReportLoading}>
                    Save Data
                  </LoadingButton>
                </SignedIn>
              </CardFooter>
            </form>
          </Form>
          <div className="max-xs:flex-wrap flex w-full items-center gap-2 p-2">
            <SendWhatsapp variant="outline" body={form.getValues()} />
            <CopyButton
              type="button"
              variant="outline"
              value={generateMessage(form.getValues())}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default FormatReport;
