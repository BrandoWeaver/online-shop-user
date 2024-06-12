import React from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";

interface Icate {
  allCategories: Icart.Category[] | undefined;
  setId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  loadingCategories: boolean;
}

function CateHead(props: Icate) {
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.setId(newValue); // Update the category_id on tab change
  };
  const navigate = useNavigate();

  return (
    <div>
      <AppBar sx={{ bgcolor: theme.palette.background.default }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="default"
            aria-label="back"
            onClick={() => {
              navigate(ROUTE_PATH.product);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ flexGrow: 1, textAlign: "center" }}
            color={theme.palette.grey["700"]}
          >
            All Categories
          </Typography>
          <IconButton
            edge="end"
            color="default"
            aria-label="search"
            onClick={() => {
              navigate(ROUTE_PATH.search);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
        <Tabs
          value={props.id} // This should be the current active category_id
          variant="scrollable"
          scrollButtons="auto"
          aria-label="category tabs"
          onChange={handleChange} // Handle tab change event
        >
          {!props.loadingCategories && (
            <Tab label="All Categories" value={"0"} />
          )}
          {props.allCategories?.map((val, i) => (
            <Tab
              label={val.name}
              key={i}
              value={val.cate_id} // Set value to the category_id
              onClick={() => {
                console.log("id", val.cate_id);
                props.setId(val.cate_id); // Optional, can be removed if handleChange is used
              }}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}

export default CateHead;
