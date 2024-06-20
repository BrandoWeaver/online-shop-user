import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ChatIcon from "@mui/icons-material/Chat";
import { MdDeliveryDining } from "react-icons/md";
import LockIcon from "@mui/icons-material/Lock";
import { StepIconProps } from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  orderStatus: string | undefined;
  orderId: string | undefined;
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "green",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "green",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const CustomStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "green",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "green",
  }),
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <ChatIcon />,
    2: <MdDeliveryDining size={24} />,
    3: <LockIcon />,
  };

  return (
    <CustomStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </CustomStepIconRoot>
  );
}

const steps = ["Preparing", "In-Deliver", "Complete"];

function getStepFromStatus(status: string) {
  switch (status) {
    case "pending":
      return 0;
    case "processing":
      return 1;
    case "completed":
      return 2;
    default:
      return 0;
  }
}

export default function CustomizedSteppers(props: Props) {
  const activeStep = getStepFromStatus(props.orderStatus || "");

  return (
    <Box padding="16px" bgcolor="#fff" textAlign="center">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
          Order Process
        </Typography>
        <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
          #{props.orderId}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        component="div"
        color="green"
        marginBottom="16px"
      >
        Order has been delivered. Please check with your rider
      </Typography>

      <Stack sx={{ width: "100%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Box>
  );
}
