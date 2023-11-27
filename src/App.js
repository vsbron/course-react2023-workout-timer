import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

// Helper function to format time
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  // Initializing state variables
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  const partOfDay = time.slice(-2); // Will be be AM or PM

  // Workouts array [Memoized]
  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  // Use effect that updates the time every second
  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    // Clear interval once component unmounts
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
