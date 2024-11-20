export const useReportUtilities = () => {
  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.startsWith("08") ? `62${phoneNumber.substring(1)}` : phoneNumber;
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

  const sendToWhatsapp = (data) => {
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

  return {
    formatPhoneNumber,
    generateMessage,
    sendToWhatsapp,
  };
};
