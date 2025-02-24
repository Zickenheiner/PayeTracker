interface Schedule {
  id: string;
  start: string;
  end: string;
}

const parseTime = (time: string) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const calculateHoursMoved = (minutes: number, rateMinutes: number) => {
  if (minutes >= 60) {
    const firstHour = 60 * rateMinutes * 3;
    const remainingMinutes = minutes - 60;
    const otherHours = remainingMinutes * rateMinutes * 2;
    return firstHour + otherHours;
  }

  return minutes * rateMinutes * 3;
};

const calculateHoursNotMoved = (minutes: number, rateMinutes: number) => {
  return minutes * rateMinutes * 0.25;
};

export const calculateHours = (
  schedule: Schedule,
  workingHours: Schedule[] | [],
) => {
  const totalHours = parseTime(schedule.end) - parseTime(schedule.start);

  const hoursMoved =
    workingHours?.length !== 0
      ? workingHours.map(({ start, end }) => {
          return parseTime(end) - parseTime(start);
        })
      : [totalHours];

  const hoursNotMoved =
    totalHours - hoursMoved.reduce((acc, curr) => acc + curr, 0);
  return { hoursMoved, hoursNotMoved };
};

export const calculateAmount = (
  hoursMoved: number[],
  hoursNotMoved: number,
  rateMinutes: number,
) => {
  const amountMoved = hoursMoved.reduce(
    (acc, curr) => acc + calculateHoursMoved(curr, rateMinutes),
    0,
  );
  return amountMoved + calculateHoursNotMoved(hoursNotMoved, rateMinutes);
};
