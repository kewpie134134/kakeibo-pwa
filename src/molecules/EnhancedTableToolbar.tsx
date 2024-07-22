import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale/ja";
import { addMonths } from "date-fns";
import { useEffect, useState } from "react";

type EnhancedTableToolbarType = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const EnhancedTableToolbar = ({ date, setDate }: EnhancedTableToolbarType) => {
  // DatePicker 用の日付 State
  const [altDate, setAltDate] = useState<Date | null>(new Date());

  // 翌月に切り替えるボタン
  const addOneMonthHandler = () => {
    setDate(addMonths(date, 1));
  };

  // 先月に切り替えるボタン
  const subOneMonthHandler = () => {
    setDate(addMonths(date, -1));
  };

  // DatePicker で切り替えた場合、元の日付を変更する
  useEffect(() => {
    // altDate が null だったら今日の日付を入れる
    if (!altDate) {
      setDate(new Date());
    } else {
      setDate(altDate);
    }
  }, [altDate, setDate]);

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
          <IconButton onClick={subOneMonthHandler}>
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
              onChange={(newValue) => setAltDate(newValue)}
              value={date}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Tooltip title="来月">
          <IconButton onClick={addOneMonthHandler}>
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
