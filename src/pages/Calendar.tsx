import { useEffect } from "react";
import { usePageNumberStore } from "../stores/pageNumber";

const Calendar = () => {
  // zustand でページ状態を設定
  const { setCalendarPage } = usePageNumberStore();
  useEffect(() => {
    setCalendarPage();
  }, [setCalendarPage]);
  return <>カレンダーページ</>;
};

export default Calendar;
