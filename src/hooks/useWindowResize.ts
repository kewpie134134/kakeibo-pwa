import { useCallback, useEffect, useState } from "react";

export const useWindowResize = () => {
  const [open, setOpen] = useState(false);

  // 画面をリサイズした時にstate調整
  const resizeEvent = useCallback(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 600) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 600) {
      setOpen(true);
    }
    resizeEvent();
    return () => window.removeEventListener("resize", resizeEvent);
  }, [resizeEvent]);

  return [open, setOpen] as const;
};
