import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  CusPasswordInputBig,
  CusTextFieldBig,
} from "../../components/CusMuiCom/CusInputs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTE_PATH } from "../../utils/route-util";
import { useRequest } from "ahooks";
import { Auth } from "../../api/Auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { LoadingSpiner } from "../../components/Loading";
import theme from "../../themes";
import { useRef } from "react";
import ErrDialog, { IErrDialogRef } from "../../components/Dialog/ErrorDialog";

interface Iform {
  name: string;
  password: string;
  rememberMe: boolean;
}
const Login = () => {
  const errRef = useRef<IErrDialogRef>(null);
  const { control, handleSubmit, watch } = useForm<Iform>();
  const { setAuthState } = useAuthContext();
  // const theme = useTheme();
  const navigate = useNavigate();
  const {
    runAsync: runLogin,
    data: login,
    loading: loadingLogin,
  } = useRequest(Auth.login, {
    manual: true,
    onSuccess: (data) => {
      console.log("SuccessRes", data);
      if (data.token) {
        setAuthState({
          isLogIn: true,
          lan: "en",
          rememberMe: watch("rememberMe"),
          token: data?.token,
          name: data.user.username,
          userId: data.user.id,
        });
      }
    },
    onError: (err) => {
      console.log("errRes", err);
      errRef.current?.open("Error Occured");
    },
  });
  const onSubmit: SubmitHandler<Iform> = async (data) => {
    await runLogin({ username: data.name, password: data.password });
  };
  if (login?.token) return <Navigate to={ROUTE_PATH.product} replace />;
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
                navigate(ROUTE_PATH.root);
              }}
            >
              <ArrowBackIcon sx={{ color: theme.palette.grey["600"] }} />
            </Button>
          </Box>
          <Box>
            <Typography variant="h4" color={"text.info"} sx={{ pb: "16px" }}>
              Sign in
            </Typography>
          </Box>
        </Box>

        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Box sx={{ pt: "16px" }}>
              <Typography
                variant="body1"
                // color={theme.palette.grey["100"]}
                sx={{ lineHeight: "24px" }}
              >
                Email/Username
              </Typography>
              <CusTextFieldBig
                size="medium"
                margin="dense"
                required
                autoFocus
                autoComplete="current-password"
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
                // color={theme.palette.grey["100"]}
                sx={{ lineHeight: "24px" }}
              >
                Password
              </Typography>
              <CusPasswordInputBig
                size="medium"
                margin="dense"
                required
                // autoFocus
                error={Boolean(error)}
                {...field}
              />
            </Box>
          )}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "16px",
          }}
        >
          <Controller
            name="rememberMe"
            control={control}
            defaultValue={false}
            render={({ field, fieldState: { error } }) => (
              <FormControlLabel
                sx={{
                  color: "text.info",
                  fontWeight: 500,
                  lineHeight: "20px",
                  letterSpacing: "0.15px",
                  "& .MuiTypography-root": {
                    fontSize: "typography.body2",
                  },
                }}
                control={<Checkbox />}
                label="Remember Me"
                {...field}
              />
            )}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loadingLogin}
          sx={{
            textTransform: "uppercase",
            color: "background.paper",
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          {!loadingLogin ? (
            "Sign in"
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingSpiner size={25} />
            </Box>
          )}
        </Button>
        <Link to={`${ROUTE_PATH.singup}`}>Register new account</Link>
      </Box>
    </Box>
  );
};

export default Login;
