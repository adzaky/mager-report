"use client";

import { useEffect, useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import TimePicker from "./TimePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { CopyButton } from "./ui/copy-button";
import { ShareEmail } from "./ui/share-email";

const FormatReport = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, description: "", status: "Incomplete", startTime: "08:00", endTime: "09:00" },
  ]);
  const [reportStatus, setReportStatus] = useState("Incomplete");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const taskList = tasks
    .map(
      (task) =>
        `[${reportStatus === "Complete" ? "done" : "todo"}] ${task.description}${reportStatus === "Complete" ? ` (${task.startTime}-${task.endTime})` : ""}`
    )
    .join("\n");

  const message = `dailyreport\n${fullName}\n\n${reportStatus}:\n${taskList}`;

  useEffect(() => {
    const savedFullName = localStorage.getItem("fullName");
    const savedPhoneNumber = localStorage.getItem("phoneNumber");

    if (savedFullName && savedPhoneNumber) {
      setFullName(savedFullName);
      setPhoneNumber(savedPhoneNumber);
      setRememberMe(true);
    }
  }, []);

  const addTask = () => {
    setTasks((prevTasks) => {
      const lastTask = prevTasks[prevTasks.length - 1];
      const newStartTime = lastTask ? lastTask?.endTime : "08:00";

      const [hours, minutes] = newStartTime?.split(":").map(Number);
      const newEndTimeDate = new Date(0, 0, 0, hours, minutes + 30);
      const newEndTime = `${newEndTimeDate?.getHours().toString().padStart(2, "0")}:${newEndTimeDate?.getMinutes().toString().padStart(2, "0")}`;

      return [
        ...prevTasks,
        {
          id: Date.now(),
          description: "",
          status: "Incomplete",
          startTime: newStartTime,
          endTime: newEndTime,
        },
      ];
    });
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    setReportMessage(message);
  }, [message]);

  const formatMessage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e?.target?.checked);
    if (e?.target?.checked) {
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("phoneNumber", phoneNumber);
    } else {
      localStorage.removeItem("fullName");
      localStorage.removeItem("phoneNumber");
    }
  };

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [fullName, phoneNumber, rememberMe]);

  useEffect(() => {
    if (reportStatus === "Incomplete") {
      setReportStatus("Incomplete");
    }
  }, [reportStatus]);

  return (
    <Card className="mx-auto w-full rounded-2xl">
      <CardHeader className="md:mb-6 md:mt-4">
        <CardTitle className="text-base font-bold md:text-center md:text-2xl">
          Educourse Daily Report Formatter
        </CardTitle>
        <CardDescription className="md:text-center">
          Made by a{" "}
          <span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="hover:underline">lazy person</TooltipTrigger>
                <TooltipContent>
                  <Link href="https://github.com/adzaky" target="_blank" className="hover:underline">
                    @adzaky
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>{" "}
          for lazy people
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="628xxxx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" defaultChecked onCheckedChange={handleRememberMeChange} />
            <Label htmlFor="rememberMe">Remember Me</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reportStatus">Report Status</Label>
            <Select onValueChange={(value) => setReportStatus(value)}>
              <SelectTrigger className="text-start">
                <SelectValue placeholder="Select Report Status (Complete/Incomplete)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tasks</Label>
            {tasks.map((task, index) => (
              <div key={task.id} className="space-y-2 rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`Task ${index + 1}`}
                    value={task.description}
                    onChange={(e) => updateTask(task.id, { description: e.target.value })}
                  />
                  <Button type="button" variant="destructive" onClick={() => removeTask(task.id)}>
                    <X className="size-4" />
                  </Button>
                </div>
                {reportStatus !== "Incomplete" && (
                  <div className="flex flex-col gap-2 max-md:py-2 md:flex-row md:items-center">
                    <span className="max-md:text-center">Work Time:</span>
                    <div className="flex flex-col items-center justify-evenly md:ml-auto md:flex-row md:gap-2">
                      <TimePicker
                        value={task.startTime}
                        onChange={(value) => updateTask(task.id, { startTime: value })}
                      />
                      <span className="text-lg">-</span>
                      <TimePicker value={task.endTime} onChange={(value) => updateTask(task.id, { endTime: value })} />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" className="w-full" onClick={addTask}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <div className="max-xs:flex-wrap flex w-full items-center gap-2">
          <ShareEmail variant="outline" body={message} />
          <CopyButton
            variant="outline"
            value={reportMessage}
            setReportMessage={setReportMessage}
            className="max-xs:w-full"
          />
        </div>
        <Button disabled={loading === true} className="w-full" onClick={formatMessage}>
          Send to WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormatReport;
