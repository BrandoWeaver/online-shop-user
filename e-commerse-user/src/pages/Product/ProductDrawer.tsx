import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import ReusableDrawer from "../../components/Drawer/DrawerCom";
interface Iproduct {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function ProductDrawer(props: Iproduct) {
  const [selectedFormat, setSelectedFormat] = React.useState("500G");
  const [quantity, setQuantity] = React.useState(1);

  const toggleDrawer = (open: boolean) => () => {
    props.setDrawerOpen(open);
  };

  const handleFormatChange = (event: any) => {
    setSelectedFormat(event.target.value);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div>
      <ReusableDrawer
        anchor="bottom"
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}
        height={500}
      >
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Bok Choy</Typography>
            <Box>
              <IconButton>
                <ShareIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box textAlign="center" mt={2}>
            <img
              src="https://via.placeholder.com/150"
              alt="Bok Choy"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Typography variant="body1" mt={2}>
            In-Stock: <span style={{ color: "blue" }}>100+</span>
          </Typography>
          <Typography variant="h4" mt={1}>
            $0.60
          </Typography>
          <Typography variant="body1" mt={2}>
            Format
          </Typography>
          <RadioGroup value={selectedFormat} onChange={handleFormatChange}>
            <FormControlLabel
              value="500G"
              control={<Radio />}
              label="500G - $0.60"
            />
            <FormControlLabel
              value="KG"
              control={<Radio />}
              label="KG - $1.00"
            />
          </RadioGroup>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" mx={2}>
              {quantity}
            </Typography>
            <IconButton onClick={() => handleQuantityChange(1)}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={toggleDrawer(false)}
            style={{ marginTop: "20px" }}
          >
            Add to Cart • $
            {(quantity * (selectedFormat === "500G" ? 0.6 : 1.0)).toFixed(2)}
          </Button>
        </Box>
      </ReusableDrawer>
    </div>
  );
}

export default ProductDrawer;
