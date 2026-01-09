import React from "react";
import { motion } from "framer-motion";
function Greeting({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-white mb-2">
        Bienvenue, {user?.prenom}
      </h1>
      <p className="text-slate-400">
        Gérez vos véhicules et réservations de parking depuis votre tableau de
        bord.
      </p>
    </motion.div>
  );
}

export default Greeting;
