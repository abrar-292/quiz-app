import { useState } from "react";
import Home from "./home/Home";
import Header from "./components/Header/Header";

export default function App() {
  const [phase, setPhase] = useState<"home" | "quiz" | "result">("home");
  const [username, setUsername] = useState("");

  const handleStart = (name: string, category: string) => {
    setUsername(name);
    setPhase("quiz");
  };

  const handleExit = () => {
    setPhase("home");
    setUsername("");
  };

  return (
    <>
      <Header phase={phase} username={username} onExit={handleExit} />
      <div style={{ padding: "1rem" }}>
        {phase === "home" && <Home onStart={handleStart} />}

        {phase === "quiz" && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h2>Quiz in progress...</h2>
          </div>
        )}

        {phase === "result" && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <h2>Result Screen</h2>
          </div>
        )}
      </div>
    </>
  );
}
