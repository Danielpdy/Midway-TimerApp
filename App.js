import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const DURATION = 10; 

export default function App() {
  
  const [seconds, setSeconds] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);


  useEffect(() => {
    if (isRunning) {
     
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
    
      clearInterval(intervalRef.current);
    }
 
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startPause = () => {
    if (seconds === 0) {
    
      setSeconds(DURATION);
    }
    setIsRunning((r) => !r);
  };


  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(DURATION);
  };

 
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };


  const progress = Math.min(1, (DURATION - seconds) / DURATION);
  const color =
    progress < 0.7 ? "#22c55e" : progress < 0.9 ? "#f59e0b" : "#ef4444";

  return (
    <div className="container">
      <div className="ring" style={{ "--pct": progress, "--ring": color }}>
        <div className="inner">
          <h1 className="timer">{formatTime(seconds)}</h1>
        </div>
      </div>

      <div className="btns">
        <button onClick={startPause}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
