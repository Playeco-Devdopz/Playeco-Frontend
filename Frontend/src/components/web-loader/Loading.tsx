import { useEffect, useState } from "react";
import './Loading.css'
function Loading() {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (true) {
      let interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 200); // To smoothly hide the bar
    }
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full z-[200]">
      <div
        style={{ width: `${progress}%` }}
        className="h-1 bg-purple-500 transition-width duration-1000"
      ></div>
    </div>
  );
}

export default Loading;
