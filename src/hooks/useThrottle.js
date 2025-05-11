import { useEffect, useState, useRef } from "react";

export const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedTime = useRef(Date.now());

  useEffect(() => {
    let timeout = setTimeout(() => {
      let now = Date.now();
      if (now - lastExecutedTime.current >= delay) {
        setThrottledValue(value);
        lastExecutedTime.current = now;
      }
    }, delay - (Date.now() - lastExecutedTime.current));

    return ()=>clearTimeout(timeout)
  }, [value, delay]);


  return throttledValue;
};
