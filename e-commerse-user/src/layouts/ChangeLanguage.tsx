import { Fragment, useRef, useState } from "react";

import { Avatar, Box, Typography, useTheme } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import { useAuthContext } from "../contexts/AuthContext";

const options = [
  {
    lang: "en",
    imag: "/assets/images/flag.png",
  },
  {
    lang: "kh",
    imag: "/assets/images/cambodia.png",
  },
];
export default function ChnageLanguage() {
  const theme = useTheme();
  const { authState, changeLng } = useAuthContext();
  const changeLanguage = (lng: string) => {
    changeLng(lng);
  };
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    changeLanguage(options[index]?.lang);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };
  return (
    <Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Avatar
          src={
            authState?.lan === undefined
              ? `${process.env.REACT_APP_BASE_PATH}/assets/images/flag.png`
              : authState?.lan === "kh"
              ? `${process.env.REACT_APP_BASE_PATH}/assets/images/cambodia.png`
              : authState?.lan === "en"
              ? `${process.env.REACT_APP_BASE_PATH}/assets/images/flag.png`
              : undefined
          }
          variant="rounded"
          sx={{ height: "20px", width: "28px" }}
          onClick={handleToggle}
        />
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              sx={{
                boxShadow: theme.shadows[2],
                borderRadius: "8px",
                background: theme.palette.background.paper,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <Box key={index}>
                      <MenuItem
                        selected={index === selectedIndex}
                        onClick={(event) => {
                          handleMenuItemClick(event, index);
                        }}
                      >
                        <Typography>{option?.lang}</Typography>
                        <Avatar
                          src={`${process.env.REACT_APP_BASE_PATH}${option.imag}`}
                          variant="rounded"
                          sx={{ height: "20px", width: "28px", ml: 1 }}
                        />
                      </MenuItem>
                    </Box>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}
