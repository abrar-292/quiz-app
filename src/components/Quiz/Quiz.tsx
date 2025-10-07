import { useCallback, useState, useRef } from "react";
import useCountdown from "../../hooks/useCountdown";
import styles from "./Quiz.module.scss";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: "A" | "B" | "C" | "D";
  timeLimit?: number;
};

export type Category = {
  id: string;
  name: string;
  questions: Question[];
};

type Props = {
  category: Category;
  onFinish: (summary: {
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
    percentage: number;
  }) => void;
};

export default function Quiz({ category, onFinish }: Props) {
  const total = category.questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, "A" | "B" | "C" | "D" | "_timeout" | undefined>
  >({});
  const isHandlingExpire = useRef(false);

  const q = category.questions[index];
  console.log("q:", q);
  const limit = q.timeLimit ?? 10;
  const isLast = index === total - 1;

  const handleExpire = useCallback(() => {
    if (isHandlingExpire.current) return;
    isHandlingExpire.current = true;

    setAnswers((prev) => (prev[q.id] ? prev : { ...prev, [q.id]: "_timeout" }));
    setIndex((prev) => Math.min(prev + 1, total - 1));

    setTimeout(() => {
      isHandlingExpire.current = false;
    }, 100);
  }, [q.id, total]);

  const { remaining, stop } = useCountdown(limit, handleExpire, index);

  const goNext = useCallback(() => {
    stop();
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [stop, total]);

  const pick = (letter: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, [q.id]: letter }));
  };

  const finish = () => {
    stop();
    const summary = summarize(category.questions, answers);
    onFinish(summary);
  };

  const progressPct = Math.round((index / total) * 100);

  const selectedLetter = answers[q.id];
  const optionLetter = (idx: number) =>
    ["A", "B", "C", "D"][idx] as "A" | "B" | "C" | "D";

  return (
    <div className={styles.wrap}>
      {/* Top info bar */}
      <div className={styles.topbar}>
        <div className={styles.count}>
          {index + 1} / {total}
        </div>
        <div
          className={styles.timer}
          data-low={remaining <= 3 ? "true" : "false"}
          aria-live="polite"
        >
          {remaining.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="card">
        {/* Progress bar */}
        <div className={styles.progress}>
          <div className={styles.bar} style={{ width: `${progressPct}%` }} />
        </div>

        {/* Question */}
        <div className={styles.qBlock}>
          <div className={styles.qTitle}>
            {index + 1}. {q.question}
          </div>

          <div className={styles.options}>
            {q.options.map((opt, idx) => {
              const letter = optionLetter(idx);
              const chosen = selectedLetter === letter;
              const isCorrect = letter === q.correctAnswer;
              return (
                <label
                  key={idx}
                  className={`${styles.option} ${chosen ? styles.chosen : ""} ${
                    chosen && isCorrect ? styles.correct : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={chosen}
                    onChange={() => pick(letter)}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>

          <div className={styles.actions}>
            {!isLast && (
              <button className="button" onClick={goNext}>
                Next
              </button>
            )}
            {isLast && (
              <button className="button" onClick={finish}>
                Finish
              </button>
            )}
            <button className={styles.skip} onClick={isLast ? finish : goNext}>
              Skip this question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function summarize(
  questions: Question[],
  ans: Record<string, "A" | "B" | "C" | "D" | "_timeout" | undefined>
) {
  let correct = 0,
    incorrect = 0,
    unanswered = 0;
  for (const q of questions) {
    const a = ans[q.id];
    if (!a || a === "_timeout") unanswered++;
    else if (a === q.correctAnswer) correct++;
    else incorrect++;
  }
  const total = questions.length;
  const percentage = Math.round((correct / total) * 100);
  return { correct, incorrect, unanswered, total, percentage };
}
