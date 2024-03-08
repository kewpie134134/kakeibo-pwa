import { Box, List } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SettingsIcon from "@mui/icons-material/Settings";
import ResponsiveDrawerListItem from "../atoms/ResponsiveDrawerListItem";

type ResponsiveDrawerList = {
  closeDrawerNav: () => void;
};

const ResponsiveDrawerList = ({ closeDrawerNav }: ResponsiveDrawerList) => {
  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ResponsiveDrawerListItem
          to="/input"
          onClick={closeDrawerNav}
          icon={<CreateIcon />}
          text="入力"
        />
        <ResponsiveDrawerListItem
          to="/note"
          onClick={closeDrawerNav}
          icon={<ImportContactsIcon />}
          text="ノート"
        />
        <ResponsiveDrawerListItem
          to="/calendar"
          onClick={closeDrawerNav}
          icon={<CalendarMonthIcon />}
          text="カレンダー"
        />
        <ResponsiveDrawerListItem
          to="/graph"
          onClick={closeDrawerNav}
          icon={<DonutSmallIcon />}
          text="グラフ"
        />
        <ResponsiveDrawerListItem
          to="/settings"
          onClick={closeDrawerNav}
          icon={<SettingsIcon />}
          text="設定"
        />
      </List>
    </Box>
  );
};

export default ResponsiveDrawerList;
