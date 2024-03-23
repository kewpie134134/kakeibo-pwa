import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale/ja";
import { useState } from "react";

const EnhancedTableToolbar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Toolbar>
      <Box
        sx={{
          flex: "1 1 100%",
        }}
        id="tableTitle"
        component="div"
        display="flex"
      >
        <Tooltip title="先月">
          <IconButton onClick={() => {}}>
            <PlayArrowOutlinedIcon
              fontSize="large"
              sx={{ transform: "scale(-1,1)" }}
            />
          </IconButton>
        </Tooltip>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              views={["month", "year"]}
              defaultValue={date}
              // slotProps={{ textField: { variant: "standard" } }}
              onError={() => {}}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Tooltip title="来月">
          <IconButton onClick={() => {}}>
            <PlayArrowOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="検索">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
