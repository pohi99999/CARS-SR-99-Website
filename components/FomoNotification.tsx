"use client";

import { useEffect, useState } from "react";

export default function FomoNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [interestedUsers, setInterestedUsers] = useState(2);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setInterestedUsers(Math.floor(Math.random() * 4) + 2);
      setIsVisible(true);
    }, 3000);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 z-30 max-w-xs rounded-xl border border-orange-300/30 bg-[#1b1b1b]/95 px-4 py-3 text-sm text-slate-100 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      🔥 Jelenleg <span className="font-semibold text-orange-300">{interestedUsers}</span> érdeklődő nézi
      ezt a járművet.
    </div>
  );
}
