import React from "react";
import { motion } from "framer-motion";
import {
  RxChevronRight,
  RxCheck,
  RxClock,
  RxLockClosed,
  RxMobile,
  RxDashboard,
  RxLayers,
  RxArrowRight,
} from "react-icons/rx";

const FeaturesSection = () => {
  const features = [
    {
      icon: <RxClock className="w-6 h-6" />,
      title: "Réservation en temps réel",
      description:
        "Réservez une place de parking instantanément. Visualisez la disponibilité en direct et sécurisez votre emplacement.",
    },
    {
      icon: <RxLockClosed className="w-6 h-6" />,
      title: "Accès sécurisé",
      description:
        "Système de bornes intelligentes avec QR code. Entrée et sortie automatisées et traçables.",
    },
    {
      icon: <RxMobile className="w-6 h-6" />,
      title: "Application mobile",
      description:
        "Gérez vos réservations depuis votre smartphone. Notifications en temps réel et paiement mobile.",
    },
    {
      icon: <RxDashboard className="w-6 h-6" />,
      title: "Tableau de bord",
      description:
        "Suivez vos contrats, paiements et historique. Vue d'ensemble complète de votre activité.",
    },
    {
      icon: <RxLayers className="w-6 h-6" />,
      title: "Multi-véhicules",
      description:
        "Enregistrez plusieurs véhicules sur un même compte. Flexibilité totale pour vos besoins.",
    },
    {
      icon: <RxCheck className="w-6 h-6" />,
      title: "Paiement simplifié",
      description:
        "Payez en ligne en toute sécurité. Abonnements mensuels ou tickets horaires disponibles.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-medium text-sm tracking-wider uppercase"
          >
            Fonctionnalités
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
          >
            Tout ce dont vous avez besoin
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Une solution complète pour simplifier la gestion de votre
            stationnement au quotidien.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 lg:p-8 bg-slate-800/30 border border-slate-700/30 rounded-2xl hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;