import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography
        sx={{ position: "fixed", left: "50%", transform: "translateX(-50%)" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        YYYY年MM月
      </Typography>
      <Tooltip title="検索" sx={{ position: "absolute", right: 24 }}>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
