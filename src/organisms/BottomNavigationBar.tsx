import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

function BottomNavigationBar() {
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="入力"
        icon={<CreateIcon />}
        component={Link}
        to="/input"
      />
      <BottomNavigationAction
        label="ノート"
        icon={<ImportContactsIcon />}
        component={Link}
        to="/note"
      />
      <BottomNavigationAction
        label="カレンダー"
        icon={<CalendarMonthIcon />}
        component={Link}
        to="/calendar"
      />
      <BottomNavigationAction
        label="グラフ"
        icon={<DonutSmallIcon />}
        component={Link}
        to="/graph"
      />
      <BottomNavigationAction
        label="設定"
        icon={<SettingsIcon />}
        component={Link}
        to="/settings"
      />
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
