import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown(seconds: number, onExpire: () => void, resetKey?: string | number) {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);

  // Keep onExpire reference up to date without restarting the timer
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setRemaining(seconds);
    
    // Clear any existing interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    // Start new countdown
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalRef.current!);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount or when seconds or resetKey changes
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [seconds, resetKey]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { remaining, stop };
}
