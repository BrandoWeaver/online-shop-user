import React, { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import {
  CusPasswordInputBig,
  CusTextFieldBig,
} from "../../components/CusMuiCom/CusInputs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRequest } from "ahooks";
import { Auth } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";
import theme from "../../themes";
import ErrDialog, { IErrDialogRef } from "../../components/Dialog/ErrorDialog";

interface IForm {
  username: string;
  email: string;
  password: string;
  fullname: string;
  address: string;
  phoneNumber: string;
}

const SignupForm = () => {
  const { control, handleSubmit } = useForm<IForm>();
  const errRef = useRef<IErrDialogRef>(null);
  const navigate = useNavigate();
  const { runAsync: runSignup } = useRequest(Auth.register, {
    manual: true,
    onSuccess: (data) => {
      console.log("SuccessRes", data);
      navigate(ROUTE_PATH.login);
    },
    onError: (err) => {
      console.log("errRes", err);
      errRef.current?.open("Error Occured");
    },
  });
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    console.log("singUp", data);
    await runSignup(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ErrDialog ref={errRef} />
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, padding: { xs: 3, md: "64px" }, width: "495px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box>
            <Button
              sx={{
                px: 1,
                textTransform: "none",
                background: theme.palette.background.default,
              }}
              onClick={() => {
                window.history.back();
              }}
            >
              <ArrowBackIcon sx={{ color: theme.palette.grey["600"] }} />
            </Button>
          </Box>
          <Box>
            <Typography variant="h4" color="text.info" sx={{ pb: "16px" }}>
              Sign Up
            </Typography>
          </Box>
        </Box>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                color="text.info"
                sx={{ lineHeight: "24px" }}
              >
                Username
              </Typography>
              <CusTextFieldBig
                size="medium"
                margin="dense"
                required
                autoFocus
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                color="text.info"
                sx={{ lineHeight: "24px" }}
              >
                Email
              </Typography>
              <CusTextFieldBig
                size="medium"
                margin="dense"
                required
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                color="text.info"
                sx={{ lineHeight: "24px" }}
              >
                Password
              </Typography>
              <CusPasswordInputBig
                size="medium"
                margin="dense"
                required
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />

        <Controller
          name="fullname"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                color="text.info"
                sx={{ lineHeight: "24px" }}
              >
                Full Name
              </Typography>
              <CusTextFieldBig
                size="medium"
                margin="dense"
                required
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />

        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                color="text.info"
                sx={{ lineHeight: "24px" }}
              >
                Address
              </Typography>
              <CusTextFieldBig
                size="medium"
                margin="dense"
                required
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                color="text.info"
                sx={{ lineHeight: "24px" }}
              >
                Phone Number
              </Typography>
              <CusTextFieldBig
                size="medium"
                margin="dense"
                required
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            textTransform: "uppercase",
            color: "background.paper",
            display: "flex",
            alignItems: "center",
            mt: 3,
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
