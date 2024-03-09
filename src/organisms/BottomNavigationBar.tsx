import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  createTheme,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { usePageNumberStore } from "../stores/pageNumber";

const theme = createTheme();

const styles = {
  wrapper: {
    display: "block",
    width: "100%",
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: 1000,
    textAlign: "center",
  },
  navAreaStyle: {
    [theme.breakpoints.up("sm")]: {
      // xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536
      // 画面幅が sm 以上であれば表示させない
      display: "none",
    },
  },
  navButtonStyle: {
    maxWidth: "100%",
  },
};

const BottomNavigationBar: React.FC = () => {
  // zustand で状態を管理
  const {
    pageNumber,
    setInputPage,
    setNotePage,
    setCalendarPage,
    setGraphPage,
    setSettingsPage,
  } = usePageNumberStore();
  return (
    <Box sx={styles.wrapper}>
      <BottomNavigation sx={styles.navAreaStyle} showLabels value={pageNumber}>
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="入力"
          icon={<CreateIcon />}
          component={Link}
          to="/input"
          onClick={setInputPage}
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="ノート"
          icon={<ImportContactsIcon />}
          component={Link}
          to="/note"
          onClick={setNotePage}
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="カレンダー"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/calendar"
          onClick={setCalendarPage}
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="グラフ"
          icon={<DonutSmallIcon />}
          component={Link}
          to="/graph"
          onClick={setGraphPage}
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="設定"
          icon={<SettingsIcon />}
          component={Link}
          to="/settings"
          onClick={setSettingsPage}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavigationBar;
