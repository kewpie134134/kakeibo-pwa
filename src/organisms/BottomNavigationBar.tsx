import React, { useState } from "react";
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
    [theme.breakpoints.up("md")]: {
      // xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536
      // 画面幅が md 以上であれば表示させない
      display: "none",
    },
  },
  navButtonStyle: {
    maxWidth: "100%",
  },
};

const BottomNavigationBar: React.FC = () => {
  const [value, setValue] = useState(0);
  return (
    <Box sx={styles.wrapper}>
      <BottomNavigation
        sx={styles.navAreaStyle}
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="入力"
          icon={<CreateIcon />}
          component={Link}
          to="/input"
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="ノート"
          icon={<ImportContactsIcon />}
          component={Link}
          to="/note"
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="カレンダー"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/calendar"
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="グラフ"
          icon={<DonutSmallIcon />}
          component={Link}
          to="/graph"
        />
        <BottomNavigationAction
          sx={styles.navButtonStyle}
          label="設定"
          icon={<SettingsIcon />}
          component={Link}
          to="/settings"
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavigationBar;
