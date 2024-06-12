import React, { Ref, forwardRef } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { MdSearch } from "react-icons/md";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import theme from "../../themes";

const CustomTextFieldStandard = styled(
  forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement> | null) => (
    <TextField ref={ref} variant="standard" {...props} />
  ))
)(() => ({
  "& .MuiInput-input": {
    borderBottomColor: theme.palette.divider,
    position: "relative",
    fontSize: "14px",
    fontWeight: 400,
    padding: "0 0 10px 0",
  },
  "::placeholder": {
    color: "blue",
  },
}));

const CusTextField = styled(
  forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement> | null) => (
    <TextField ref={ref} variant="outlined" {...props} />
  ))
)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.grey[200],
    height: "43px",
    padding: "16px 0px",
    borderRadius: theme.shape.borderRadius,
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
  },
}));

const CusTextFieldBig = styled(
  forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement> | null) => (
    <TextField
      ref={ref}
      variant="outlined"
      {...props}
      autoComplete="current-password"
      fullWidth
    />
  ))
)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    color: theme.palette.grey["500"],
    fontSize: "16px",
    "& fieldset": {
      borderColor: theme.palette.grey["100"],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
const CusTextFieldSearch = styled(
  forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement> | null) => (
    <TextField
      ref={ref}
      variant="outlined"
      {...props}
      autoComplete="current-password"
      fullWidth
    />
  ))
)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    color: theme.palette.grey["500"],
    fontSize: "16px",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
const CusPasswordInputBig = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement> | null) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <CusTextFieldBig
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
const CusPasswordInput = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement> | null) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <CusTextField
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

const CusinputSearch = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement> | null) => {
    const handleInput = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    return (
      <CusTextFieldSearch
        id="outlined-adornment-password"
        // placeholder='Search Employee'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={handleClickShowPassword}
                onMouseDown={handleInput}
                edge="end"
              >
                <MdSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

const CusTextFieldFirstIcon = styled(
  forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement> | null) => (
    <TextField
      ref={ref}
      variant="outlined"
      {...props}
      autoComplete="current-password"
      fullWidth
    />
  ))
)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    color: theme.palette.grey["500"],
    fontSize: "16px",
    "& fieldset": {
      borderColor: theme.palette.grey["100"],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export {
  CusTextField,
  CusPasswordInput,
  CusPasswordInputBig,
  CusTextFieldBig,
  CustomTextFieldStandard,
  CusinputSearch,
  CusTextFieldFirstIcon,
};
