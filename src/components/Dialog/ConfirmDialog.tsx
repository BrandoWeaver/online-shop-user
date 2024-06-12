import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Breakpoint,
} from '@mui/material';

interface IConfirmDialog {
  open: boolean;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  maxWidth?: Breakpoint;
  loading?: boolean;
}

const ConfirmDialog = (props: IConfirmDialog) => {
  const { open, maxWidth = 'xs' } = props;
  return (
    <Dialog open={open} fullWidth maxWidth={maxWidth}>
      <DialogTitle>{props.title || 'Are you sure?'}</DialogTitle>
      <DialogContent>
        {typeof props.message === 'string' ? (
          <Typography>{props.message}</Typography>
        ) : (
          props.message
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>No</Button>
        <Button onClick={props.onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
