import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirming = false,
  destructive = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !confirming) {
        onCancel();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, confirming, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close dialog"
        disabled={confirming}
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl"
      >
        <h2 id="confirm-dialog-title" className="text-xl font-semibold">
          {title}
        </h2>
        <p
          id="confirm-dialog-description"
          className="mt-2 text-sm leading-6 text-slate-600"
        >
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={confirming}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            disabled={confirming}
            className={
              destructive
                ? undefined
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
            onClick={onConfirm}
          >
            {confirming ? "Please wait..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
