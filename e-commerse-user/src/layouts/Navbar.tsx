import { memo, useState } from "react";

import { AppBar, Drawer, Toolbar } from "@mui/material";
import { Box } from "@mui/material";

// import { useAuthContext } from "../contexts/AuthContext";
import { DrawerApp } from "./Menubar";
import PrimarySearchAppBar from "./TopBar";

function Navbar() {
  // const { authState, updateUserType, setLogInStatus } = useAuthContext();
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.paper",
        // boxShadow: theme.shadows[1],
        // border: "1px solid #E3E5E5",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // px: { md: 5, xs: 1 },
        }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            minWidth: '0px',
          }}
        >
          <IconButton
            onClick={() => {
              setOpenDrawer((pre) => !pre);
            }}
            size='small'
            sx={{ mr: 2, minWidth: '0px', display: { md: 'none', xs: 'flex' } }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            variant='square'
            src={`${process.env.REACT_APP_BASE_PATH}/assets/images/mainlogo.png`}
            sx={{ width: '70px', height: '48px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <ChnageLanguage />
          <FormControl>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={authState.userType}
              sx={{ height: '40px' }}
              onChange={(e) => {
                updateUserType(e.target.value);
              }}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'sale'}>Sale</MenuItem>
              <MenuItem value={'manager'}>Manager</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title='Account settings'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{
                bgcolor: 'background.paper',
                px: 0,
                py: 0.5,
                ':hover': {
                  bgcolor: 'transparent',
                },
                ':active': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <Avatar
                sx={{
                  width: '44px',
                  height: '44px',
                }}
                src={`${process.env.REACT_APP_BASE_PATH}/assets/images/logo.png`}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: `drop-shadow(0px 4px 12px rgba(0,0,0,0.15))`,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 17,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 3, py: 1 }}>
              <Typography
                variant='h6'
                sx={{ color: 'text.primary', fontWeight: 600 }}
              >
                {authState.name}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ py: 1 }}>
              <MenuItem
                onClick={() => setLogInStatus(false)}
                sx={{
                  ':hover': {
                    bgcolor: 'background.default',
                    color: 'error.main',
                  },
                }}
              >
                Logout
              </MenuItem>
            </Box>
          </Menu>
        </Box> */}
        <PrimarySearchAppBar />
      </Toolbar>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <DrawerApp drawerWidth={280} setOpenDrawer={setOpenDrawer} />
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default memo(Navbar);
