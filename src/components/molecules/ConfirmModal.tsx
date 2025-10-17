"use client";

import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  title = "Confirm Action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onCancel}
      />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <div className="text-sm text-gray-700 mb-6">{description}</div>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border rounded-lg text-gray-700 text-sm hover:bg-gray-50 disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-50 text-red-500 border border-red-500 rounded-lg text-sm hover:bg-red-100 disabled:opacity-60"
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
