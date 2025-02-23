import { CirclePlus } from "lucide-react";
import ScheduleInput from "../components/ScheduleInput";
import "../styles/AddSchedules.css";
import { type FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";

interface ScheduleType {
  id: string;
  start: string;
  end: string;
}

export default function AddSchedules() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleType[]>([
    {
      id: uid(),
      start: "00:00",
      end: "00:00",
    },
  ]);

  const addSchedule = () => {
    setSchedule([
      ...schedule,
      {
        id: uid(),
        start: schedule[0].start,
        end: schedule[0].end,
      } as ScheduleType,
    ]);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="add-schedules-page-container">
      <h1 className="add-schedules-title">Ajouter une astreinte</h1>
      <form className="add-schedules-form-container" onSubmit={handleSubmit}>
        <h2 className="add-schedules-form-title">
          Entrer la plage de votre astreinte :
        </h2>
        <ScheduleInput
          edit={false}
          remove={false}
          schedule={schedule}
          setSchedule={setSchedule}
          id={schedule[0].id}
        />
        <h2 className="add-schedules-form-title">
          Ajouter des horaires personnalisés :
        </h2>
        {schedule.map(
          (elem, index) =>
            index !== 0 && (
              <ScheduleInput
                key={elem.id}
                edit={false}
                remove={true}
                schedule={schedule}
                setSchedule={setSchedule}
                id={elem.id}
              />
            ),
        )}
        <CirclePlus
          size={35}
          className="add-schedules-form-add-button"
          onClick={addSchedule}
        />
        <button type="submit" className="add-schedules-form-button">
          Valider
        </button>
      </form>
    </main>
  );
}
