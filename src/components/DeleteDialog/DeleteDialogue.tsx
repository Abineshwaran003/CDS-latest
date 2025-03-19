import React from "react";
import {
    Dialog,
    DialogSurface,
    DialogBody,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@fluentui/react-components";
import {Button} from "@fluentui/react-components";

type DialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmBtnLabel: string;
    cancelBtnLabel: string;
    confirmButtonStyle?: React.CSSProperties;
    isConfirmDisabled?: boolean;
};

const CustomDialog: React.FC<DialogProps> =
    ({
         open,
         onClose,
         onConfirm,
         title = "Confirm Action",
         message = "Are you sure you want to proceed?",
         confirmBtnLabel = "Confirm", cancelBtnLabel = "Cancel",
         confirmButtonStyle = {backgroundColor: "#F15D22", color: "white"},
         isConfirmDisabled
     }) => {
        return (
            <Dialog open={open}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogContent>{message}</DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={onClose}>
                                {cancelBtnLabel}
                            </Button>
                            <Button
                                appearance="primary"
                                onClick={onConfirm}
                                style={confirmButtonStyle}
                                disabled={isConfirmDisabled}
                            >
                                {confirmBtnLabel}
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        );
    };

export default CustomDialog;