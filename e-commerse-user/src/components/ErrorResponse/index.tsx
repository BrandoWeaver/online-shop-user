import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface IErrorResponse {
  message: string | Error;
  height?: string;

  buttonText?: string;
  buttonAction?: () => void;
}

export default function ErrorResponse({
  message = "something wrong",
  height = "calc(100% - 76px)",

  buttonText = "Refresh",
  buttonAction,
}: IErrorResponse) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height={height}
      spacing={1}
    >
      <Typography variant="h6" color="text.secondary">
        {message.toString()}
      </Typography>
      {buttonText && buttonAction && (
        <Button onClick={buttonAction}>{buttonText}</Button>
      )}
    </Stack>
  );
}
