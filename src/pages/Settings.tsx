import { useEffect } from "react";
import { usePageNumberStore } from "../stores/pageNumber";

const Settings = () => {
  // zustand でページ状態を設定
  const { setSettingsPage } = usePageNumberStore();
  useEffect(() => {
    setSettingsPage();
  }, [setSettingsPage]);
  return <>設定ページ</>;
};

export default Settings;
