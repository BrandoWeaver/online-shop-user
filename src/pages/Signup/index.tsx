import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import {
  CusPasswordInputBig,
  CusTextFieldBig,
} from "../../components/CusMuiCom/CusInputs";
import { useRequest } from "ahooks";
import { Auth } from "../../api/Auth";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../utils/route-util";

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
  const navigate = useNavigate();
  const { runAsync: runSignup } = useRequest(Auth.register, {
    manual: true,
    onSuccess: (data) => {
      console.log("SuccessRes", data);
      navigate(ROUTE_PATH.login);
    },
    onError: (err) => {
      console.log("errRes", err);
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
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, padding: "64px", width: "495px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" color="text.info" sx={{ pb: "16px" }}>
          Sign Up
        </Typography>

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
