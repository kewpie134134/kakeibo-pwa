import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { usePageNumberStore } from "../stores/pageNumber";

type ResponsiveDrawerListItemProps = {
  to: string;
  onClick?: () => void;
  icon: JSX.Element;
  text: string;
  sortOrder: number;
};

const ResponsiveDrawerListItem = ({
  to,
  onClick,
  icon,
  text,
  sortOrder,
}: ResponsiveDrawerListItemProps) => {
  const { pageNumber } = usePageNumberStore();
  const isSelected = sortOrder === pageNumber;
  return (
    <ListItemButton
      component={Link}
      to={to}
      onClick={onClick}
      selected={isSelected}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default ResponsiveDrawerListItem;
