import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/api";
import {
  Background,
  ContratsCard,
  DetailRow,
  Loading,
  NavbarHomePage,
  SuccessErrorMsg,
} from "../../components";
import MyQRCode from "../../QrCode/MyqrCode";

function Contrats() {
  const navigate = useNavigate();
  const [contrats, setContrats] = useState([]);
  const [tarifabn, setTarifabn] = useState(0);
  const [tariftkh, setTaritkh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")
  const [parking,setParking] = useState("")

  // Filter state
  const [filter, setFilter] = useState("all"); // all, actif, termine, resilie

  // Terminate modal
  const [terminateModal, setTerminateModal] = useState(false);
  const [contratToTerminate, setContratToTerminate] = useState(null);
  const [terminateLoading, setTerminateLoading] = useState(false);

  // Detail modal
  const [detailModal, setDetailModal] = useState(false);
  const [selectedContrat, setSelectedContrat] = useState(null);

  // Fetch contrats on load
  useEffect(() => {
    fetchContrats();
  }, []);

  useEffect(() => {
    if (!selectedContrat) return;
    handleTarif(selectedContrat);
    fetchIdParking(selectedContrat)
  }, [selectedContrat]);
  useEffect(() => {
    if (!contratToTerminate) return;
    handleTerminate(contratToTerminate);
  }, [contratToTerminate]);

  const fetchContrats = async () => {
    try {
      const res = await API.getContrats();
      setContrats(res.data.contrats || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Erreur lors du chargement des contrats");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchIdParking = async (contrat)=>{
    try{
      const res = await API.getIdParkingByPlace(contrat.id_place)
      setParking(res.data.id_parking)
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Erreur lors du chargement des contrats");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleTarif = async (contrat) => {
    try {
      if (contrat.type_contrat === "abonnement") {
        const res = await API.getAbn(contrat.id_contrat);
        setTarifabn(res.data.abn.tarif_mensuel);
      }

      if (contrat.type_contrat === "ticketHoraire") {
        const res = await API.getTkh(contrat.id_contrat);
        setTaritkh(res.data.tk.tarif_mensuel);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Erreur lors du chargement des contrats");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const openTerminateModal = (contrat) => {
    setContratToTerminate(contrat);
    setTerminateModal(true);
  };

  const handleTerminate = async (contratToTerminate) => {
    if (!contratToTerminate) return;

    setTerminateLoading(true);
    try {
      await API.deleteContrat(contratToTerminate.id_contrat);
      setSuccess("Contrat résilié avec succès");
      setTerminateModal(false);
      setContratToTerminate(null);
      fetchContrats();
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la résiliation");
    } finally {
      setTerminateLoading(false);
    }
  };

  const openDetailModal = (contrat) => {
    setSelectedContrat(contrat);
    setDetailModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (etat) => {
    switch (etat) {
      case "actif":
        return {
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          border: "border-emerald-500/20",
          label: "Actif",
          icon: (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
          ),
        };
      case "termine":
        return {
          bg: "bg-slate-500/10",
          text: "text-slate-400",
          border: "border-slate-500/20",
          label: "Terminé",
          icon: (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        };
      case "resilie":
        return {
          bg: "bg-red-500/10",
          text: "text-red-400",
          border: "border-red-500/20",
          label: "Résilié",
          icon: (
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
        };
      default:
        return {
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          border: "border-amber-500/20",
          label: etat || "Inconnu",
          icon: null,
        };
    }
  };

  const getTypeBadge = (type) => {
    if (type === "abonnement") {
      return {
        bg: "bg-violet-500/10",
        text: "text-violet-400",
        border: "border-violet-500/20",
        label: "Abonnement",
      };
    }
    return {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
      label: "Ticket Horaire",
    };
  };

  const filteredContrats = contrats.filter((contrat) => {
    if (filter === "all") return true;
    return contrat.etat_contrat === filter;
  });

  const stats = {
    total: contrats.length,
    actifs: contrats.filter((c) => c.etat_contrat === "actif").length,
    termines: contrats.filter((c) => c.etat_contrat === "termine").length,
    resilies: contrats.filter((c) => c.etat_contrat === "resilie").length,
  };
  if (loading) {
    <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Elements */}
      <Background />

      {/* Navbar */}
      <NavbarHomePage user={null} />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mes contrats</h1>
            <p className="text-slate-400">
              Gérez vos réservations et abonnements de parking.
            </p>
          </div>
          <button
            onClick={() => navigate("/parkings")}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nouvelle réservation
          </button>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <SuccessErrorMsg.SuccessMsg
              success={success}
              setSuccess={setSuccess}
            />
          )}
          {error && (
            <SuccessErrorMsg.ErrorMsg error={error} setError={setError} />
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <ContratsCard
            label="Total"
            value={stats.total}
            onClick={() => setFilter("all")}
            active={filter === "all"}
            color="slate"
          />
          <ContratsCard
            label="Actifs"
            value={stats.actifs}
            onClick={() => setFilter("actif")}
            active={filter === "actif"}
            color="emerald"
          />
          <ContratsCard
            label="Terminés"
            value={stats.termines}
            onClick={() => setFilter("termine")}
            active={filter === "termine"}
            color="slate"
          />
          <ContratsCard
            label="Résiliés"
            value={stats.resilies}
            onClick={() => setFilter("resilie")}
            active={filter === "resilie"}
            color="red"
          />
        </motion.div>

        {/* Contrats List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {filter === "all" ? "Tous les contrats" : `Contrats ${filter}s`}
            </h2>
            <span className="text-sm text-slate-400">
              {filteredContrats.length} contrat
              {filteredContrats.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredContrats.length === 0 ? (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">Aucun contrat</h3>
              <p className="text-slate-400 text-sm mb-6">
                {filter === "all"
                  ? "Vous n'avez pas encore de contrat. Réservez une place pour commencer."
                  : `Aucun contrat ${filter}.`}
              </p>
              {filter === "all" && (
                <button
                  onClick={() => navigate("/parkings")}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-3 rounded-xl transition-all duration-200"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Réserver une place
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filteredContrats.map((contrat, index) => {
                const statusBadge = getStatusBadge(contrat.etat_contrat);
                const typeBadge = getTypeBadge(contrat.type_contrat);

                return (
                  <motion.div
                    key={contrat.id_contrat}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 sm:p-6 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Contract Info */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-mono font-semibold text-white">
                              {contrat.id_contrat}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} flex items-center gap-1`}
                            >
                              {statusBadge.icon}
                              {statusBadge.label}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full border ${typeBadge.bg} ${typeBadge.text} ${typeBadge.border}`}
                            >
                              {typeBadge.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatDateShort(contrat.date_debut)}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                              </svg>
                              Place {contrat.id_place}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 17h8M8 17v-4m8 4v-4m-8 0h8"
                                />
                              </svg>
                              {contrat.id_vehicule}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 ml-16 lg:ml-0">
                        <button
                          onClick={() => openDetailModal(contrat)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Détails
                        </button>
                        {contrat.etat_contrat === "actif" && (
                          <button
                            onClick={() => openTerminateModal(contrat)}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 border border-red-500/20"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Résilier
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      {/* Terminate Confirmation Modal */}
      <AnimatePresence>
        {terminateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setTerminateModal(false)}
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-white text-center mb-2">
                Résilier le contrat ?
              </h3>
              <p className="text-slate-400 text-center mb-6">
                Êtes-vous sûr de vouloir résilier le contrat{" "}
                <span className="text-white font-mono font-semibold">
                  {contratToTerminate?.id_contrat}
                </span>{" "}
                ? Cette action est irréversible et la place sera libérée.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setTerminateModal(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={async () => {
                    await handleTerminate(contratToTerminate);
                  }}
                  disabled={terminateLoading}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-400 disabled:bg-slate-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {terminateLoading ? (
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
                    "Résilier"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setDetailModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Détails du contrat
                </h3>
                <button
                  onClick={() => setDetailModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <DetailRow
                  label="ID Contrat"
                  value={selectedContrat.id_contrat}
                  mono
                />
                <DetailRow
                  label="Statut"
                  value={
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        getStatusBadge(selectedContrat.etat_contrat).bg
                      } ${getStatusBadge(selectedContrat.etat_contrat).text} ${
                        getStatusBadge(selectedContrat.etat_contrat).border
                      }`}
                    >
                      {getStatusBadge(selectedContrat.etat_contrat).label}
                    </span>
                  }
                />
                <DetailRow
                  label="Type"
                  value={
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        getTypeBadge(selectedContrat.type_contrat).bg
                      } ${getTypeBadge(selectedContrat.type_contrat).text} ${
                        getTypeBadge(selectedContrat.type_contrat).border
                      }`}
                    >
                      {getTypeBadge(selectedContrat.type_contrat).label}
                    </span>
                  }
                />
                <DetailRow
                  label="Véhicule"
                  value={selectedContrat.id_vehicule}
                  mono
                />
                <DetailRow label="Place" value={selectedContrat.id_place} />
                <DetailRow label="Parking" value={selectedContrat.id_parking} />
                <DetailRow
                  label="Date de début"
                  value={formatDate(selectedContrat.date_debut)}
                />
                <DetailRow
                  label="Date de fin"
                  value={formatDate(selectedContrat.date_fin)}
                />
                <DetailRow
                  label="Durée"
                  value={
                    selectedContrat.type_contrat === "abonnement"
                      ? `${selectedContrat.duree} jours`
                      : `${selectedContrat.duree} heures`
                  }
                />
                {selectedContrat.type_contrat === "abonnement" ? (
                  <>
                    <DetailRow
                      label="Tarif mensuel"
                      value={`${tarifabn || "-"} €`}
                    />
                    <DetailRow
                      label="Renouvelable"
                      value={selectedContrat.renouvelable ? "Oui" : "Non"}
                    />
                  </>
                ) : (
                  <DetailRow
                    label="Tarif horaire"
                    value={`${tariftkh || "-"} €`}
                  />
                )}
                <MyQRCode id_contrat={selectedContrat.id_contrat} id_parking={parking} />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800">
                {selectedContrat.etat_contrat === "actif" ? (
                  <button
                    onClick={() => {
                      setDetailModal(false);
                      openTerminateModal(selectedContrat);
                    }}
                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-xl transition-colors border border-red-500/20"
                  >
                    Résilier ce contrat
                  </button>
                ) : (
                  <button
                    onClick={() => setDetailModal(false)}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Fermer
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Contrats;
