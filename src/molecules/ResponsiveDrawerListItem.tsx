import { Box, List } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SettingsIcon from "@mui/icons-material/Settings";
import ResponsiveDrawerListItem from "../atoms/ResponsiveDrawerListItem";
import { usePageNumberStore } from "../stores/pageNumber";

type ResponsiveDrawerList = {
  closeDrawerNav: () => void;
};

const ResponsiveDrawerList = ({ closeDrawerNav }: ResponsiveDrawerList) => {
  // zustand で状態を管理
  const {
    setInputPage,
    setNotePage,
    setCalendarPage,
    setGraphPage,
    setSettingsPage,
  } = usePageNumberStore();

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ResponsiveDrawerListItem
          to="/input"
          onClick={() => {
            closeDrawerNav();
            setInputPage();
          }}
          icon={<CreateIcon />}
          text="入力"
        />
        <ResponsiveDrawerListItem
          to="/note"
          onClick={() => {
            closeDrawerNav();
            setNotePage();
          }}
          icon={<ImportContactsIcon />}
          text="ノート"
        />
        <ResponsiveDrawerListItem
          to="/calendar"
          onClick={() => {
            closeDrawerNav();
            setCalendarPage();
          }}
          icon={<CalendarMonthIcon />}
          text="カレンダー"
        />
        <ResponsiveDrawerListItem
          to="/graph"
          onClick={() => {
            closeDrawerNav();
            setGraphPage();
          }}
          icon={<DonutSmallIcon />}
          text="グラフ"
        />
        <ResponsiveDrawerListItem
          to="/settings"
          onClick={() => {
            closeDrawerNav();
            setSettingsPage();
          }}
          icon={<SettingsIcon />}
          text="設定"
        />
      </List>
    </Box>
  );
};

export default ResponsiveDrawerList;
