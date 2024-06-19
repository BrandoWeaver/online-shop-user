import { PaletteColorOptions, createTheme } from "@mui/material/styles";

type TypeText = {
  primary: string;
  // success: string;
  // error: string;
  // info:string;
};
const primary: PaletteColorOptions = {
  main: "#007AFF",
  // light: "#FBF2F7",
};
const textColor: TypeText = {
  primary: "#000000",
  // success: "#229A16",
  // error: "#FF3A23",
  // info:'#202122'
};

const theme = createTheme({
  typography: {
    fontFamily: ["Inter-Regular", "Inter-Bold", "Inter-Medium", "Arial"].join(
      ","
    ),
    fontSize: 14,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 28,
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
    },
    h5: {
      fontSize: 18,
      fontWeight: 700,
    },
    h6: {
      fontSize: 16,
    },
    subtitle1: {
      fontSize: 16,
    },
    subtitle2: {
      fontSize: 14,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
    overline: {
      fontSize: 12,
    },
  },
  palette: {
    primary,
    background: {
      default: "#F3F4F5",
      paper: "#FFFFFF",
    },
    common: {
      white: "#FFFFFF",
    },
    success: {
      main: "#229A16",
      light: "rgba(84, 214, 44, 0.16)",
    },
    error: {
      main: "#FF3A23",
      light: "#FFE5E5",
    },
    warning: {
      main: "#A05E03",
      light: "#FFEFD7",
    },
    grey: {
      50: "#F2F4F5",
      100: "#6C7072",
      200: "#72777A",
      300: "#4A4D4F",
      400: "#42474E",
      500: "#303437",
      600: "#404446",
      700: "#363839",
      800: "#202425",
      900: "#000000",
    },

    text: textColor,
    divider: "rgba(145, 158, 171, 0.24)",
  },
  shape: {
    borderRadius: 4,
  },
});

theme.shadows[1] = "0px 5px 20px -4px #919EAB1F";
theme.shadows[2] = "0px 4px 12px 0px #00000026";
theme.shadows[3] = "0px 24px 48px 0px #919EAB33";
theme.shadows[4] = "0px 2px 2px 0px #0000001A";
theme.components = {
  MuiMenu: {
    defaultProps: {
      PaperProps: {
        sx: {
          borderRadius: "8px",
          boxShadow: "0px 4px 12px 0px #00000026",
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: ``,
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: "capitalize",
        borderRadius: "12px",
        height: "48px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: `${theme.palette.grey[50]} !important`,
          margin: "0 8px",
        },
        margin: "0 8px",
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderColor: theme.palette.divider,
      },
    },
    defaultProps: {
      MenuProps: {
        PaperProps: {
          sx: {
            boxShadow: "0px 4px 12px 0px #00000026",
            borderRadius: "8px",
          },
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
        ":hover": {
          textDecoration: "underline",
        },
      },
    },
  },
};
export default theme;
