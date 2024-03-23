import { Box, IconButton, Toolbar, Tooltip, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Box
        sx={{
          flex: "1 1 100%",
        }}
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
        <Button
          size="large"
          color="inherit"
          onClick={() => {
            console.log("AAAA");
          }}
        >
          YYYY年MM月
        </Button>
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
