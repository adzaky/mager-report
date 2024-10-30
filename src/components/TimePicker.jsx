import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const TimePicker = ({ value, onChange }) => {
  const [hours, minutes] = value.split(":").map(Number);

  const handleHourChange = (newHour) => {
    onChange(`${newHour.padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
  };

  const handleMinuteChange = (newMinute) => {
    onChange(`${hours.toString().padStart(2, "0")}:${newMinute.padStart(2, "0")}`);
  };

  return (
    <div className="flex space-x-2">
      <Select value={hours.toString()} onValueChange={handleHourChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 24 }, (_, i) => (
            <SelectItem key={i} value={i.toString()}>
              {i.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-2xl">:</span>
      <Select value={minutes.toString()} onValueChange={handleMinuteChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i} value={(i * 5).toString()}>
              {(i * 5).toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePicker;
