import { useEffect } from "react";
import { usePageNumberStore } from "../stores/pageNumber";

const Input = () => {
  // zustand でページ状態を設定
  const { setInputPage } = usePageNumberStore();
  useEffect(() => {
    setInputPage();
  }, [setInputPage]);

  return <>入力ページ</>;
};

export default Input;
