import styles from "./modal.module.scss";

const MOCK_RULES = [
  {
    title: "Each question has a 10-second timer.",
    list: [
      { text: "Each question comes with a 10-second timer." },
      {
        text: "If you don’t answer within the time limit, the app will automatically move to the next question.",
      },
    ],
  },
  {
    title: "If time runs out, you’ll automatically move to the next question.",
    list: [
      {
        text: "You can navigate to the next question manually before the timer expires.",
      },
      {
        text: "Use the 'Next' button to move ahead if you’re ready before the timer runs out.",
      },
    ],
  },
  {
    title: "Score will be shown at the end of the quiz.",
    list: [
      {
        text: "After all questions are answered, your final score will be displayed.",
      },
      {
        text: "Based on your performance, you will receive a personalized message:",
        subList: [
          { text: "Great job!: If you score <strong>above 80%</strong>." },
          {
            text: "Well done!: If you score <strong>between 60% and 80%.</strong>",
          },
          {
            text: "Keep practicing!: If you score <strong>below 60%.</strong>",
          },
        ],
      },
    ],
  },
];

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function Modal({ show, onClose }: Props) {
  if (!show) return null;

  /** Recursive renderer for nested list */
  const renderList = (
    items: { text: string; subList?: { text: string }[] }[]
  ) => (
    <ul className={styles.rulesList}>
      {items.map((item, idx) => (
        <li key={idx}>
          <span dangerouslySetInnerHTML={{ __html: item.text }} />
          {item.subList && renderList(item.subList)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Quiz Rules</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {MOCK_RULES.map((rule) => (
            <div key={rule.title} className={styles.ruleBlock}>
              <h3 className={styles.ruleTitle}>{rule.title}</h3>
              {renderList(rule.list)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
