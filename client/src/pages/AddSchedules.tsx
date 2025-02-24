import { CirclePlus } from "lucide-react";
import ScheduleInput from "../components/ScheduleInput";
import "../styles/AddSchedules.css";
import { type FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { useAuth } from "../contexts/AuthProvider";

interface ScheduleType {
  id: string;
  start: string;
  end: string;
}

export default function AddSchedules() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const dateRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/work_sessions`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: auth?.user_id,
            date: dateRef.current?.value,
            schedules: schedule,
          }),
        },
      );
      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="add-schedules-page-container">
      <h1 className="add-schedules-title">Ajouter une astreinte</h1>
      <form className="add-schedules-form-container" onSubmit={handleSubmit}>
        <h2 className="add-schedules-form-title">
          Entrer la plage de votre astreinte :
        </h2>
        <p>
          Le :{" "}
          <input
            type="date"
            ref={dateRef}
            className="add-schedules-form-date"
            required
          />
        </p>
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
