import React from "react";
import { motion } from "framer-motion";
const DeleteModel = ({ vehiculeToDelete, handleDelete, deleteLoading,setDeleteModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={() => setDeleteModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-white text-center mb-2">
          Supprimer le véhicule ?
        </h3>
        <p className="text-slate-400 text-center mb-6">
          Êtes-vous sûr de vouloir supprimer{" "}
          <span className="text-white font-mono font-semibold">
            {vehiculeToDelete?.id_vehicule}
          </span>{" "}
          ? Cette action est irréversible.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setDeleteModal(false)}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="flex-1 py-3 bg-red-500 hover:bg-red-400 disabled:bg-slate-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {deleteLoading ? (
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Supprimer"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteModel;
