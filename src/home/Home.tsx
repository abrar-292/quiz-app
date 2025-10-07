import { useState } from "react";
import styles from "./home.module.scss";
import questionsData from "../../questions.json";
import Modal from "../components/Modal/Modal";

type Props = {
  onStart: (name: string, category: string) => void;
};

const CATEGORIES = questionsData.categories.map((c) => c.name);

export default function Home({ onStart }: Props) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");
  const [showRules, setShowRules] = useState(false);

  const canStart = name.trim() !== "" && selected !== "";

  return (
    <div className={`container text-center`}>
      <h1 className={styles.title}>
        Welcome to{" "}
        <span className={styles.brand}>
          Quiz<strong>Mania</strong>
        </span>
      </h1>

      <div className={`d-flex flex-col align-center ${styles.homeContainer}`}>
        <div className={`w-100 ${styles.rulesContainer}`}>
          <p className={styles.subtext}>
            Please read all the rules before starting your quiz.
          </p>

          <button
            className={styles.rulesBtn}
            onClick={() => setShowRules(true)}
          >
            Quiz Rules
          </button>
        </div>

        <div className={`w-100 ${styles.form}`}>
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />

          <label>Select Category</label>
          <div className={styles.categories}>
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className={`${styles.radioOption} ${
                  selected === cat ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selected === cat}
                  onChange={() => setSelected(cat)}
                />
                <span className={styles.radioLabel}>{cat}</span>
              </label>
            ))}
          </div>

          <button
            className={`${styles.startBtn} button`}
            disabled={!canStart}
            onClick={() => onStart(name, selected)}
          >
            Start Quiz
          </button>
        </div>
      </div>

      <Modal show={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
}
