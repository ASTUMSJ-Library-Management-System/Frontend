import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";

/**
 * A reusable, responsive, and accessible confirmation dialog.
 * @param {object} props
 * @param {React.ReactNode} props.trigger - The button or element that opens the dialog.
 * @param {string} props.title - The title of the dialog (e.g., "Are you sure?").
 * @param {React.ReactNode} props.description - The descriptive text inside the dialog.
 * @param {() => void} props.onConfirm - The function to call when the confirm button is clicked.
 * @param {string} [props.confirmText="Confirm"] - The text for the confirmation button.
 * @param {string} [props.cancelText="Cancel"] - The text for the cancel button.
 * @param {boolean} [props.isDestructive=false] - If true, styles the confirm button for a destructive action.
 */
export function ConfirmationDialog({
  trigger,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={isDestructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}