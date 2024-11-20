export const useTaskManager = (watchTasks, append) => {
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
      id: watchTasks.length + 1,
      description: "",
      startTime: newStartTime,
      endTime: newEndTime,
    });
  };

  return {
    addTask,
  };
};
