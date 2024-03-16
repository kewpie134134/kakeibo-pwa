import { useEffect } from "react";
import { usePageNumberStore } from "../stores/pageNumber";

const Note = () => {
  // zustand でページ状態を設定
  const { setNotePage } = usePageNumberStore();
  useEffect(() => {
    setNotePage();
  }, [setNotePage]);
  return <>ノートページ</>;
};

export default Note;
