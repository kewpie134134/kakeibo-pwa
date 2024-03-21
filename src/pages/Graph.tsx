import { useEffect } from "react";
import { usePageNumberStore } from "../stores/pageNumber";

const Graph = () => {
  // zustand でページ状態を設定
  const { setGraphPage } = usePageNumberStore();
  useEffect(() => {
    setGraphPage();
  }, [setGraphPage]);
  return <>グラフページ</>;
};

export default Graph;
