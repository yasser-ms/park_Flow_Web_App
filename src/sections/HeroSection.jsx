import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RxChevronRight, RxArrowRight } from "react-icons/rx";
import API from "../api/api.js";

import { DashboardCard } from "../components/index.js";

const HeroSection = () => {
  const [placesDispo, setPlacesDispo] = useState(0);
  const [allPlaces, setAllPlaces] = useState(0);
  const [contratActif, setContratActif] = useState(0);
  const [totalMontant, setTotalMontant] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      async function placesDispoFetch() {
        const response = await API.estDisponible();
        const totalPlaces = response.data.total_disponibles;
        setPlacesDispo(totalPlaces);
      }
      placesDispoFetch();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else {
        setError("Erreur lors du chargement des informations utilisateur.");
      }
    }
  }, []);
  useEffect(() => {
    try {
      async function fetchPlaces() {
        const response = await API.getPlaces();
        const places = response.data.total;
        setAllPlaces(places);
      }
      fetchPlaces();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Erreur lors du chargement des informations utilisateur.");
      }
    }
  }, [placesDispo]);
  useEffect(() => {
    try {
      const fetchContrat = async () => {
        const response = await API.getContrats();
        const totalContrat = response.data.total_active_contrats;
        setContratActif(totalContrat);
      };
      fetchContrat();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else {
        setError("Erreur lors du chargement des informations utilisateur.");
      }
    }
  }, []);
  useEffect(() => {
    try {
      const fetchMontant = async () => {
        const response = await API.getMontant();
        const totalMontant = response.data.total_montant;
        setTotalMontant(totalMontant);
      };
      fetchMontant();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
      } else {
        setError("Erreur lors du chargement des informations utilisateur.");
      }
    }
  }, []);
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-slate-300 text-sm">
              Solution de stationnement intelligent
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Gérez votre parking{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              sans effort
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Une plateforme complète pour la gestion de vos places de parking.
            Réservation, paiement et contrôle d'accès en temps réel.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/register"
              className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/25"
            >
              Créer un compte gratuit
              <RxArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-8 py-4 transition-colors"
            >
              Voir la démo
              <RxChevronRight />
            </a>
          </motion.div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 lg:mt-24"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />

            {/* Dashboard Preview */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-slate-700/50 rounded-lg px-4 py-1 text-xs text-slate-400">
                    parkflow.app/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Stats Cards */}
                  {/* A faire :  SELECTIONNER LES contarts where etat_contrat = Active */}
                  {/* A faire :  SELECTIONNER LES  Revenue d'aujourd'hui*/}
                  <DashboardCard
                    title="Places disponibles"
                    value={placesDispo}
                    subtitle={`sur ${allPlaces} places`}
                    color="emerald"
                  />
                  <DashboardCard
                    title="Réservations actives"
                    value={contratActif}
                    subtitle="aujourd'hui"
                    color="cyan"
                  />
                  <DashboardCard
                    title="Revenus du jour"
                    value={`${totalMontant}£`}
                    subtitle="+12% vs hier"
                    color="violet"
                  />
                </div>

                {/* Parking Grid Preview */}
                <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-300">
                      Parking A - Niveau 1
                    </span>
                    <span className="text-xs text-slate-500">
                      Mise à jour en temps réel
                    </span>
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded-md ${
                          [2, 5, 7, 12, 15, 18].includes(i)
                            ? "bg-emerald-500/30 border border-emerald-500/50"
                            : "bg-slate-700/30 border border-slate-600/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
