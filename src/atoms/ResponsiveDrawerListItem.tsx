import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

type ResponsiveDrawerListItemProps = {
  to: string;
  onClick: () => void;
  icon: JSX.Element;
  text: string;
};

const ResponsiveDrawerListItem = ({
  to,
  onClick,
  icon,
  text,
}: ResponsiveDrawerListItemProps) => {
  return (
    <ListItem component={Link} to={to} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default ResponsiveDrawerListItem;
