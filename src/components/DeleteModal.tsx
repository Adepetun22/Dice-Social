import React from "react";
import Loading from "./Loading";

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-6 whitespace-pre-line">{message}</p>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <Loading/> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
