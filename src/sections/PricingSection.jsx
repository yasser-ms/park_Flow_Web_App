import React from "react";
import { motion } from "framer-motion";
import { RxCheck } from "react-icons/rx";
import { Link } from "react-router-dom";
const PricingSection = () => {
  const plans = [
    {
      name: "Ticket Horaire",
      price: "2.50",
      unit: "/ heure",
      description: "Idéal pour les stationnements ponctuels",
      features: [
        "Paiement à l'usage",
        "Accès à tous les parkings",
        "QR code unique",
        "Historique des passages",
      ],
      highlighted: false,
    },
    {
      name: "Abonnement",
      price: "49",
      unit: "/ mois",
      description: "Pour les utilisateurs réguliers",
      features: [
        "Place garantie",
        "Accès illimité",
        "Tarif préférentiel",
        "Support prioritaire",
        "Multi-véhicules",
        "Facturation mensuelle",
      ],
      highlighted: true,
    },
    {
      name: "Entreprise",
      price: "Sur devis",
      unit: "",
      description: "Solutions sur mesure pour les entreprises",
      features: [
        "Flotte de véhicules",
        "Facturation centralisée",
        "API dédiée",
        "Account manager",
        "SLA personnalisé",
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-medium text-sm tracking-wider uppercase"
          >
            Tarifs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
          >
            Des tarifs transparents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Choisissez la formule qui correspond à vos besoins.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.highlighted
                  ? "bg-gradient-to-b from-emerald-500/10 to-slate-900 border-emerald-500/30"
                  : "bg-slate-800/30 border-slate-700/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-xs font-semibold px-4 py-1 rounded-full">
                  Populaire
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-slate-400">{plan.unit}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <RxCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                Commencer
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;