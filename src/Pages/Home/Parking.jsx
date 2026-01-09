import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/api";

function Parkings() {
  const navigate = useNavigate();
  const [parkings, setParkings] = useState([]);
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success,setSuccess] = useState(false);

  // Reservation form state
  const [selectedParking, setSelectedParking] = useState(null);
  const [formData, setFormData] = useState({
    type_contrat: "tickethoraire",
    id_vehicule: "",
    date_debut: "",
    duree: "",
  });
  const [formError, setFormError] = useState("");

  // Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [parkingsRes, vehiculesRes] = await Promise.all([
        API.get("/parkings/"),
        API.get("/vehicules/"),
      ]);
      setParkings(parkingsRes.data.parkings || []);
      setVehicules(vehiculesRes.data.vehicules || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Erreur lors du chargement des données");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReserveClick = (parking) => {
    if (selectedParking?.id_parking === parking.id_parking) {
      setSelectedParking(null);
    } else {
      setSelectedParking(parking);
      setFormData({
        type_contrat: "tickethoraire",
        id_vehicule: vehicules.length > 0 ? vehicules[0].id_vehicule : "",
        date_debut: "",
        duree: "",
      });
      setFormError("");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validation
    if (!formData.id_vehicule) {
      setFormError("Veuillez sélectionner un véhicule");
      return;
    }
    if (!formData.date_debut) {
      setFormError("Veuillez sélectionner une date de début");
      return;
    }
    if (!formData.duree || formData.duree <= 0) {
      setFormError("Veuillez entrer une durée valide");
      return;
    }

    // Validate duration based on type
    if (formData.type_contrat === "tickethoraire") {
      if (formData.duree < 1 || formData.duree > 24) {
        setFormError("La durée doit être entre 1 et 24 heures");
        return;
      }
    } else {
      if (formData.duree < 1 || formData.duree > 52) {
        setFormError("La durée doit être entre 1 et 52 semaines");
        return;
      }
    }

    // Navigate to payment page with reservation data
    navigate("/achat", {
      state: {
        reservation: {
          parking: selectedParking,
          id_vehicule: formData.id_vehicule,
          type_contrat: formData.type_contrat,
          date_debut: formData.date_debut,
          duree: parseInt(formData.duree),
        },
      },
    });
  };

  const getDurationLabel = () => {
    if (formData.type_contrat === "tickethoraire") {
      return "Durée (en heures)";
    }
    return "Durée (en semaines)";
  };

  const getDurationPlaceholder = () => {
    if (formData.type_contrat === "tickethoraire") {
      return "1-24 heures";
    }
    return "1-52 semaines";
  };

  const getDurationHint = () => {
    if (formData.type_contrat === "tickethoraire") {
      return "Durée en heures pour un ticket horaire (1-24)";
    }
    return "Durée en semaines pour un abonnement (1-52)";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-emerald-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-slate-400">Chargement des parkings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-slate-950 font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                Park<span className="text-emerald-400">Flow</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/vehicules" className="text-slate-400 hover:text-white transition-colors text-sm">
                Véhicules
              </Link>
              <Link to="/contrats" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contrats
              </Link>
              <Link to="/parkings" className="text-emerald-400 text-sm font-medium">
                Parkings
              </Link>
            </div>

            <Link
              to="/home"
              className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Parkings disponibles</h1>
          <p className="text-slate-400">
            Trouvez et réservez une place de parking en quelques clics.
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-emerald-400 text-sm font-medium">{success}</span>
                <p className="text-emerald-400/60 text-xs mt-1">Redirection vers vos contrats...</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-red-400 text-sm">{error}</span>
              <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Vehicles Warning */}
        {vehicules.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-amber-400 text-sm font-medium">Aucun véhicule enregistré</p>
              <p className="text-amber-400/60 text-xs mt-1">
                Vous devez d'abord ajouter un véhicule pour pouvoir réserver une place.
              </p>
            </div>
            <Link
              to="/vehicules"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-sm rounded-lg transition-colors"
            >
              Ajouter un véhicule
            </Link>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{parkings.length}</p>
                <p className="text-xs text-slate-400">Parkings</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {parkings.reduce((acc, p) => acc + (p.nombre_places || 0), 0)}
                </p>
                <p className="text-xs text-slate-400">Places totales</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {parkings.reduce((acc, p) => acc + (p.places_disponibles || 0), 0)}
                </p>
                <p className="text-xs text-slate-400">Places libres</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17v-4m8 4v-4m-8 0h8" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{vehicules.length}</p>
                <p className="text-xs text-slate-400">Mes véhicules</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Parkings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {parkings.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Aucun parking disponible</h3>
              <p className="text-slate-400 text-sm">
                Il n'y a pas de parkings disponibles pour le moment.
              </p>
            </div>
          ) : (
            parkings.map((parking, index) => (
              <motion.div
                key={parking.id_parking}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
              >
                {/* Parking Header */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {parking.nom}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {parking.adresse}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {parking.nombre_places} places
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-18 lg:ml-0">
                      {/* Availability Badge */}
                      <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        (parking.places_disponibles || 0) > 5
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : (parking.places_disponibles || 0) > 0
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {parking.places_disponibles || 0} places libres
                      </div>

                      {/* Reserve Button */}
                      <button
                        onClick={() => handleReserveClick(parking)}
                        disabled={vehicules.length === 0 || (parking.places_disponibles || 0) === 0}
                        className={`px-5 py-2.5 font-semibold text-sm rounded-xl transition-all duration-200 flex items-center gap-2 ${
                          selectedParking?.id_parking === parking.id_parking
                            ? "bg-slate-700 text-white"
                            : vehicules.length === 0 || (parking.places_disponibles || 0) === 0
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                            : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/25"
                        }`}
                      >
                        {selectedParking?.id_parking === parking.id_parking ? (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Annuler
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Réserver
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reservation Form */}
                <AnimatePresence>
                  {selectedParking?.id_parking === parking.id_parking && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-slate-800/30 border-t border-slate-800">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Réserver une place
                        </h4>

                        {formError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
                          >
                            <span className="text-red-400 text-sm">{formError}</span>
                          </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Type de contrat */}
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Type de contrat
                            </label>
                            <div className="relative">
                              <select
                                name="type_contrat"
                                value={formData.type_contrat}
                                onChange={handleFormChange}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200 appearance-none cursor-pointer"
                              >
                                <option value="tickethoraire">Ticket Horaire</option>
                                <option value="abonnement">Abonnement</option>
                              </select>
                              <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Véhicule */}
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Véhicule
                            </label>
                            <div className="relative">
                              <select
                                name="id_vehicule"
                                value={formData.id_vehicule}
                                onChange={handleFormChange}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200 appearance-none cursor-pointer"
                              >
                                {vehicules.map((v) => (
                                  <option key={v.id_vehicule} value={v.id_vehicule}>
                                    {v.modele} ({v.id_vehicule})
                                  </option>
                                ))}
                              </select>
                              <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Date de début */}
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Date de début
                            </label>
                            <input
                              type="datetime-local"
                              name="date_debut"
                              value={formData.date_debut}
                              onChange={handleFormChange}
                              min={new Date().toISOString().slice(0, 16)}
                              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200"
                              required
                            />
                          </div>

                          {/* Durée */}
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              {getDurationLabel()}
                            </label>
                            <input
                              type="number"
                              name="duree"
                              value={formData.duree}
                              onChange={handleFormChange}
                              placeholder={getDurationPlaceholder()}
                              min="1"
                              max={formData.type_contrat === "tickethoraire" ? "24" : "52"}
                              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200"
                              required
                            />
                            <p className="mt-2 text-xs text-slate-500">
                              {getDurationHint()}
                            </p>
                          </div>

                          {/* Submit Button - Navigate to payment */}
                          <div className="md:col-span-2">
                            <button
                              type="submit"
                              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                              <span>Procéder au paiement</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default Parkings;