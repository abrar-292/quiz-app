import styles from "./Header.module.scss";

type Props = {
  phase: "home" | "quiz" | "result";
  username: string;
  onExit?: () => void;
};

export default function Header({ phase, username, onExit }: Props) {
  return (
    <header className={`${styles.header}`}>
      <div className="container">
        <h1 className={styles.title}>
          <span className={styles.quiz}>Quiz</span>
          <span className={styles.mania}>Mania</span>
        </h1>

        <div className={styles.right}>
          {phase === "quiz" && (
            <button className={styles.exitBtn} onClick={onExit}>
              Exit Quiz
            </button>
          )}

          {phase === "result" && (
            <div className="d-flex align-center gap-1">
              <div className={styles.avatar} title={username}>
                {username.charAt(0).toUpperCase()}
              </div>
              {username}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
