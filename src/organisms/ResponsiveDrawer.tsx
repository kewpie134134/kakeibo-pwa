import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactNode, useEffect, useState } from "react";
import ResponsiveDrawerList from "../molecules/ResponsiveDrawerListItem";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../libs/firebaseConfig";
import { useAuthUser } from "../stores/authUser";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

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

  // zustand 状態を管理
  const { user, setUser } = useAuthUser();

  // ログアウト時の Navigate を設定
  const navigate = useNavigate();

  const openCloseDrawerNav = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const closeDrawerNav = () => {
    setIsDrawerOpen(false);
  };

  // ログインしているかどうかを判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, [setUser]);

  // ログアウト時の処理
  const logout = async () => {
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
                  <IconButton
                    onClick={openCloseDrawerNav}
                    color="inherit"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    タイトル
                  </Typography>
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
                <ResponsiveDrawerList closeDrawerNav={closeDrawerNav} />
              </Drawer>

              {/* Main */}
              <Main open={isDrawerOpen}>
                <Toolbar variant="dense" sx={{ minHeight: 40 }} />
                <Box>{children}</Box>
                <button onClick={logout}>ログアウト</button>
              </Main>
            </Box>
          </>
        ))}
    </>
  );
};

export default ResponsiveDrawer;
