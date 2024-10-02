"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import TimePicker from "./TimePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";

const GenerateReport = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, description: "", status: "Incomplete", startTime: "08:00", endTime: "09:00" },
  ]);
  const [reportStatus, setReportStatus] = useState("Incomplete");
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        description: "",
        status: "Incomplete",
        startTime: "08:00",
        endTime: "17:00",
      },
    ]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const generateMessage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const taskList = tasks
      .map(
        (task) =>
          `[${reportStatus === "Complete" ? "done" : "todo"}] ${task.description} (${task.startTime}-${task.endTime})`
      )
      .join("\n");

    const message = `dailyreport
${fullName}

${reportStatus}:
${taskList}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <Card className="mx-auto w-full rounded-2xl">
      <CardHeader className="md:mb-6 md:mt-4">
        <CardTitle className="text-base font-bold md:text-center md:text-2xl">
          Educourse Daily Report Generator
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
          <div className="space-y-2">
            <Label htmlFor="reportStatus">Report Status</Label>
            <Select value={reportStatus} onValueChange={(value) => setReportStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose report status" />
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
                    <X className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </div>
                {reportStatus !== "Incomplete" && (
                  <div className="flex items-center gap-2">
                    <span>Work Time:</span>
                    <div className="ml-auto flex items-center justify-evenly gap-2">
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
      <CardFooter>
        <Button disabled={loading === true} className="w-full" onClick={generateMessage}>
          Generate Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GenerateReport;
