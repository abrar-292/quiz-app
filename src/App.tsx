import { useCallback, useState } from "react";
import Home from "./home/Home";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import Header from "./components/Header/Header";
import questionsData from "../questions.json";
import type { Category as QuizCategory } from "./components/Quiz/Quiz";

type Category = (typeof questionsData.categories)[number];

const categories = questionsData.categories as Category[];

export default function App() {
  const [phase, setPhase] = useState<"home" | "quiz" | "result">("home");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [summary, setSummary] = useState<{
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
    percentage: number;
  } | null>(null);

  const handleStart = useCallback((name: string, categoryName: string) => {
    setUsername(name);
    const sel = categories.find((c) => c.name === categoryName) || null;
    setCategory(sel);
    setPhase("quiz");
  }, []);

  const handleExit = useCallback(() => {
    setPhase("home");
    setUsername("");
    setCategory(null);
    setSummary(null);
  }, []);

  const handleFinish = useCallback((s: typeof summary) => {
    setSummary(s);
    setPhase("result");
  }, []);

  const handleRetake = useCallback(() => {
    setPhase("home");
    setSummary(null);
    setCategory(null);
  }, []);

  return (
    <>
      <Header phase={phase} username={username} onExit={handleExit} />
      <div className="container">
        {phase === "home" && <Home onStart={handleStart} />}

        {phase === "quiz" && category && (
          <Quiz category={category as QuizCategory} onFinish={handleFinish} />
        )}

        {phase === "result" && summary && (
          <Result summary={summary} onRetake={handleRetake} />
        )}
      </div>
    </>
  );
}
