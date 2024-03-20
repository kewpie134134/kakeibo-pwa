import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import ResponsiveDrawerList from "../molecules/ResponsiveDrawerListItem";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../libs/firebaseConfig";
import { useAuthUser } from "../stores/authUser";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "./BottomNavigationBar";
import { AccountCircle } from "@mui/icons-material";
import { useWindowResize } from "../hooks/useWindowResize";

const drawerWidth = 200;
const headerNavigationHeight = 56;
const bottomNavigationHeight = 56;
const theme = createTheme();

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    // position: "relative", // ボトムナビゲーションの上に被せない
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "fixed",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth})`,
    },
    zIndex: () => theme.zIndex.drawer + 1,
  },
  appBarIcon: {
    [theme.breakpoints.down("sm")]: {
      // xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536
      // 画面幅が sm 以下であれば表示させない
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
      position: "relative",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    paddingTop: `calc(10px + ${headerNavigationHeight}px)`,
    paddingBottom: `calc(10px + ${bottomNavigationHeight}px)`,
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up("sm")]: {
      paddingBottom: 10,
    },
  },
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -1 * drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

type ResponsiveDrawerProps = {
  children: ReactNode;
};

const ResponsiveDrawer = ({ children }: ResponsiveDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ローディング状態の State
  const [loading, setLoading] = useState<boolean>(true);

  // ナビゲーションバー右アイコンのプロフィールメニューに設定するアンカーの State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // カスタムフックからウィンドウサイズを計測し、左メニューアイコンバーの表示非表示を判定する
  const [isVisible] = useWindowResize();

  // zustand ユーザー状態を管理
  const { user, setUser } = useAuthUser();

  // ログアウト時の Navigate を設定
  const navigate = useNavigate();

  const openCloseDrawerNav = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // アップバーの右サイドアカウントメニューアイコン操作
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ログインしているかどうかを判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, [setUser]);

  // 画面サイズが 600px 以上の場合左メニューを開き、599px 以下の場合は左メニューを閉じる
  useEffect(() => {
    if (isVisible) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [isVisible]);

  // ログアウト時の処理
  const handleLogout = async () => {
    setAnchorEl(null);
    await signOut(auth);
    navigate("/login/");
  };

  // URL のパス名を把握
  const pathname = useLocation().pathname;

  return (
    <>
      {/* ローディングが false の時に画面を表示させる */}
      {!loading &&
        (!user ? (
          pathname === "/register/" ? (
            <>
              <Navigate to={"/register/"} />
              <Box>{children}</Box>
            </>
          ) : (
            <>
              <Navigate to={"/login/"} />
              <Box>{children}</Box>
            </>
          )
        ) : (
          <>
            <Box sx={styles.root}>
              <CssBaseline />
              {/* AppBar */}
              <AppBar sx={styles.appBar}>
                <Toolbar variant="dense">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={4} textAlign="start">
                      <IconButton
                        onClick={openCloseDrawerNav}
                        color="inherit"
                        sx={styles.appBarIcon}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={4} textAlign="center">
                      <Link
                        color="inherit"
                        underline="none"
                        variant="h6"
                        noWrap
                        href="#" // TODO: 要検討
                        sx={{ flexGrow: 1, textAlign: "center" }}
                      >
                        家計簿アプリ
                      </Link>
                    </Grid>
                    <Grid item xs={4} textAlign="end">
                      <div>
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                        <Menu
                          sx={{ mt: 4 }}
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <div>
                            <Typography>メールアドレス</Typography>
                            <Typography>{user.email}</Typography>
                          </div>
                          <Divider />
                          <MenuItem onClick={handleMenuClose}>
                            プロフィール
                          </MenuItem>
                          <MenuItem onClick={handleMenuClose}>
                            アカウント
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                        </Menu>
                      </div>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>

              {/* Drawer */}
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": { width: drawerWidth },
                }}
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
              >
                <Toolbar variant="dense" sx={{ minHeight: 46 }} />
                <ResponsiveDrawerList />
              </Drawer>

              {/* Main */}
              <Main open={isDrawerOpen}>
                <Toolbar variant="dense" sx={{ minHeight: 32 }} />
                <Box>{children}</Box>
                <BottomNavigationBar />
              </Main>
            </Box>
          </>
        ))}
    </>
  );
};

export default ResponsiveDrawer;
