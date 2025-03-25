import { Pencil, Trash2 } from "lucide-react";
import "../styles/ScheduleInput.css";

interface ScheduleType {
  id: string;
  start: string;
  end: string;
}

interface ScheduleInputProps {
  edit: boolean;
  remove: boolean;
  schedule: ScheduleType[];
  setSchedule: (schedule: ScheduleType[]) => void;
  id: string;
}

export default function ScheduleInput({
  edit,
  remove,
  schedule,
  setSchedule,
  id,
}: ScheduleInputProps) {
  const handleChange = (value: string, field: string) => {
    setSchedule(
      schedule.map((elem) =>
        elem.id === id ? { ...elem, [field]: value } : elem,
      ),
    );
  };

  const handleRemove = () => {
    setSchedule(schedule.filter((elem) => elem.id !== id));
  };

  return (
    <div className="schedules-input-container">
      <p>De :</p>
      <input
        type="time"
        className="schedules-input"
        defaultValue="00:00"
        onChange={(e) => handleChange(e.target.value, "start")}
      />
      <p>À :</p>{" "}
      <input
        type="time"
        className="schedules-input"
        defaultValue="00:00"
        onChange={(e) => handleChange(e.target.value, "end")}
      />
      {edit && <Pencil size={20} className="schedules-input-edit" />}
      {remove && (
        <Trash2
          size={20}
          className="schedules-input-remove"
          onClick={handleRemove}
        />
      )}
    </div>
  );
}
