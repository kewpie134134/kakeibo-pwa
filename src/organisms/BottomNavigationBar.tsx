import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SettingsIcon from "@mui/icons-material/Settings";

function BottomNavigationBar() {
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => {
        console.log(_);
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="入力" icon={<CreateIcon />} />
      <BottomNavigationAction label="ノート" icon={<ImportContactsIcon />} />
      <BottomNavigationAction label="カレンダー" icon={<CalendarMonthIcon />} />
      <BottomNavigationAction label="グラフ" icon={<DonutSmallIcon />} />
      <BottomNavigationAction label="設定" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
