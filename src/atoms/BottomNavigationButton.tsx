import { BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";

type BottomNavigationButtonProps = {
  text: string;
  icon: JSX.Element;
  to: string;
};

const BottomNavigationButton = ({
  text,
  icon,
  to,
}: BottomNavigationButtonProps) => {
  return (
    <BottomNavigationAction
      sx={{ maxWidth: "100%" }}
      label={text}
      icon={icon}
      component={Link}
      to={to}
    />
  );
};

export default BottomNavigationButton;
