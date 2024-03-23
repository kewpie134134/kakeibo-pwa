import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        YYYY年MM月
      </Typography>
      <Tooltip title="検索">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
