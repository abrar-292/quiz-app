import styles from "./Result.module.scss";
import SadFace from "../../../public/sadface.svg";

export default function Result({
  summary,
  onRetake,
}: {
  summary: {
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
    percentage: number;
  };
  onRetake: () => void;
}) {
  const tone =
    summary.percentage >= 80
      ? "success"
      : summary.percentage >= 60
      ? "neutral"
      : "failure";

  const title =
    tone === "success"
      ? "CONGRATULATION"
      : tone === "neutral"
      ? "Well done!"
      : "KEEP PRACTICING!";

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        {tone === "failure" ? (
          <div>
            <img src={SadFace} alt="Sad Face" />
          </div>
        ) : (
          <div className={styles.icon}>✓</div>
        )}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>
          You successfully completed the Quiz and holds
        </p>

        <div className={`${styles.scoreCircle} ${styles[tone]}`}>
          <div>Your Score</div>
          <strong>{summary.percentage}%</strong>
        </div>

        <div className={styles.stats}>
          <div>
            <strong className={styles.success}>{summary.correct}</strong>{" "}
            Correct
          </div>
          <div>
            <strong className={styles.failure}>{summary.incorrect}</strong>{" "}
            Incorrect
          </div>
          <div>
            <strong className={styles.neutral}>{summary.unanswered}</strong> Not
            answered
          </div>
        </div>

        <button className={`${styles.reTake} button`} onClick={onRetake}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
