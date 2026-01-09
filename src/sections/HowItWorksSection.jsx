import React from "react";
import {motion} from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Créez votre compte",
      description:
        "Inscrivez-vous en quelques secondes et ajoutez vos véhicules à votre profil.",
    },
    {
      step: "02",
      title: "Réservez une place",
      description:
        "Choisissez un parking, sélectionnez une place disponible et confirmez votre réservation.",
    },
    {
      step: "03",
      title: "Accédez au parking",
      description:
        "Scannez votre QR code à la borne d'entrée. La barrière s'ouvre automatiquement.",
    },
    {
      step: "04",
      title: "Payez en ligne",
      description:
        "Réglez votre stationnement depuis l'application. Recevez votre reçu par email.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-medium text-sm tracking-wider uppercase"
          >
            Comment ça marche
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
          >
            Simple comme bonjour
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Quatre étapes pour stationner en toute sérénité.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-700 to-transparent" />
              )}

              <div className="text-6xl font-bold text-slate-800 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default HowItWorksSection;