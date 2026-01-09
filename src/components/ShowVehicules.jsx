import React from "react";
import { motion } from "framer-motion";
function ShowVehicules({ vehicules, openDeleteModal, getTypeIcon, getTypeBadgeColor }) {
  return vehicules.length === 0 ? (
    <div className="p-12 text-center">
      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 17h8M8 17v-4m8 4v-4m-8 0h8m-8 0V9a1 1 0 011-1h6a1 1 0 011 1v4M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-white font-medium mb-2">Aucun véhicule</h3>
      <p className="text-slate-400 text-sm">
        Ajoutez votre premier véhicule pour commencer.
      </p>
    </div>
  ) : (
    <div className="divide-y divide-slate-800">
      {vehicules.map((vehicule, index) => (
        <motion.div
          key={vehicule.id_vehicule}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
              {getTypeIcon(vehicule.type)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-white text-lg">
                  {vehicule.id_vehicule}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTypeBadgeColor(
                    vehicule.type
                  )}`}
                >
                  {vehicule.type}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">{vehicule.modele}</p>
            </div>
          </div>

          <button
            onClick={() => openDeleteModal(vehicule)}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default ShowVehicules;
