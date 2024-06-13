import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, Breakpoint } from "@mui/material";

interface ICusDialog {
  maxWidth?: Breakpoint;
  children: ReactNode;
  onCloseDialog?: () => void;
}

export interface ICusDialogHandler {
  open: () => void;
  close: () => void;
}

const CusDialog = forwardRef<ICusDialogHandler, ICusDialog>((props, ref) => {
  const [open, setOpen] = useState(false);
  const { maxWidth = "xs", children } = props;

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
        props.onCloseDialog && props.onCloseDialog();
      },
    }),
    [props]
  );

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={maxWidth}
      onClose={() => {
        handleClose();
        props.onCloseDialog && props.onCloseDialog();
      }}
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      {children}
    </Dialog>
  );
});

export default CusDialog;
