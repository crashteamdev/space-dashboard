import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface DemoSuccessModalProps {
    open: boolean;
    onClose: () => void;
}

export const DemoSuccessModal: React.FC<DemoSuccessModalProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 2,
                },
            }}
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="div">
                        Вам выдан доступ к демо-версии
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    py={4}
                >
                    <CheckCircleOutlineIcon
                        color="success"
                        sx={{ fontSize: 60, mb: 2 }}
                    />
                    <Typography variant="h6" align="center" gutterBottom>
                        Поздравляем!
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary">
                        You have successfully received demo access to the platform.
                        You can now explore all the features available in the demo version.
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
