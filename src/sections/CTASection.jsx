import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RxArrowRight } from "react-icons/rx";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl p-10 lg:p-16 text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          </div>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à simplifier votre stationnement ?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont déjà adopté ParkFlow
              pour gérer leur stationnement au quotidien.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group flex items-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all duration-200"
              >
                Créer un compte gratuit
                <RxArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#contact"
                className="text-white/90 hover:text-white font-medium px-8 py-4 transition-colors"
              >
                Contacter l'équipe
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
