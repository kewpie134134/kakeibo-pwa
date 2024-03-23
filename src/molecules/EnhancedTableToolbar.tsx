import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Typography
        sx={{ position: "fixed", left: "50%", transform: "translateX(-50%)" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <Tooltip title="先月">
          <IconButton onClick={() => {}}>
            <PlayArrowOutlinedIcon
              fontSize="large"
              sx={{ transform: "scale(-1,1)" }}
            />
          </IconButton>
        </Tooltip>
        YYYY年MM月
        <Tooltip title="来月">
          <IconButton onClick={() => {}}>
            <PlayArrowOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
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
