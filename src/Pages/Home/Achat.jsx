// Note: In real app, never send card details to your backend
// Use Stripe, PayPal, etc.

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loading } from "../../components/index.js";
import API from "../../api/api";

function Achat() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get reservation data from navigation state
  const reservationData = location.state?.reservation;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Card form state
  const [cardData, setCardData] = useState({
    numero_carte: "",
    nom_carte: "",
    date_expiration: "",
    cvv: "",
  });

  // Card validation state
  const [cardErrors, setCardErrors] = useState({});
  const [cardType, setCardType] = useState(null);

  // Redirect if no reservation data
  useEffect(() => {
    if (!reservationData) {
      navigate("/parkings");
    }
  }, [reservationData, navigate]);

  // Detect card type
  useEffect(() => {
    const number = cardData.numero_carte.replace(/\s/g, "");
    if (number.startsWith("4")) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
      setCardType("mastercard");
    } else if (number.startsWith("34") || number.startsWith("37")) {
      setCardType("amex");
    } else {
      setCardType(null);
    }
  }, [cardData.numero_carte]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiration = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero_carte") {
      setCardData({ ...cardData, [name]: formatCardNumber(value) });
    } else if (name === "date_expiration") {
      setCardData({ ...cardData, [name]: formatExpiration(value) });
    } else if (name === "cvv") {
      setCardData({
        ...cardData,
        [name]: value.replace(/[^0-9]/g, "").slice(0, 4),
      });
    } else {
      setCardData({ ...cardData, [name]: value });
    }

    // Clear error for this field
    setCardErrors({ ...cardErrors, [name]: "" });
  };

  const validateCard = () => {
    const errors = {};
    const cardNumber = cardData.numero_carte.replace(/\s/g, "");

    // Validate card number (Luhn algorithm simplified)
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      errors.numero_carte = "Numéro de carte invalide";
    }

    // Validate name
    if (!cardData.nom_carte.trim()) {
      errors.nom_carte = "Nom requis";
    }

    // Validate expiration
    const [month, year] = cardData.date_expiration.split("/");
    if (!month || !year || parseInt(month) > 12 || parseInt(month) < 1) {
      errors.date_expiration = "Date invalide";
    } else {
      const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expDate < new Date()) {
        errors.date_expiration = "Carte expirée";
      }
    }

    // Validate CVV
    if (!cardData.cvv || cardData.cvv.length < 3) {
      errors.cvv = "CVV invalide";
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculatePrice = () => {
    if (!reservationData) return 0;

    const { type_contrat, duree, parking } = reservationData;

    if (type_contrat === "tickethoraire") {
      // Tarif horaire: 2.50€/heure (example)
      const tarifHoraire = parking?.tarif_horaire || 2.5;
      return (tarifHoraire * duree).toFixed(2);
    } else {
      // Tarif mensuel: 49€/semaine = 49/4 par semaine (example)
      const tarifMensuel = parking?.tarif_mensuel || 49;
      const tarifHebdo = tarifMensuel / 4;
      return (tarifHebdo * duree).toFixed(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateCard()) {
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create the contrat
      const contratResponse = await API.post("/contrats/", {
        id_parking: reservationData.parking.id_parking,
        id_vehicule: reservationData.id_vehicule,
        type_contrat: reservationData.type_contrat,
        date_debut: reservationData.date_debut,
        duree: parseInt(reservationData.duree),
      });

      const contratId = contratResponse.data.contrat?.id_contrat;

      // Step 2: Create the payment
      await API.post("/paiement/", {
        id_contrat: contratId,
      });

      setSuccess(true);

      // Redirect to contrats after 3 seconds
      setTimeout(() => {
        navigate("/contrats");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  if (!reservationData) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              className="w-12 h-12 text-emerald-400"
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
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Paiement réussi !
          </h1>
          <p className="text-slate-400 mb-2">
            Votre réservation a été confirmée.
          </p>
          <p className="text-slate-500 text-sm">
            Redirection vers vos contrats...
          </p>
        </motion.div>
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

            <button
              onClick={() => navigate("/parkings")}
              className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Annuler
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Paiement</h1>
          <p className="text-slate-400">
            Finalisez votre réservation en toute sécurité
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-red-400 text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-white">
                  Récapitulatif
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {/* Parking */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {reservationData.parking?.nom}
                    </p>
                    <p className="text-sm text-slate-400">
                      {reservationData.parking?.adresse}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white font-medium">
                      {reservationData.type_contrat === "tickethoraire"
                        ? "Ticket Horaire"
                        : "Abonnement"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Véhicule</span>
                    <span className="text-white font-mono">
                      {reservationData.id_vehicule}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date de début</span>
                    <span className="text-white">
                      {new Date(reservationData.date_debut).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Durée</span>
                    <span className="text-white">
                      {reservationData.duree}{" "}
                      {reservationData.type_contrat === "tickethoraire"
                        ? "heure(s)"
                        : "semaine(s)"}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {calculatePrice()} €
                  </span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Paiement sécurisé
                </p>
                <p className="text-xs text-slate-400">
                  Vos données sont cryptées et protégées
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-white">
                  Informations de paiement
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Numéro de carte
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="numero_carte"
                        value={cardData.numero_carte}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                          cardErrors.numero_carte
                            ? "border-red-500/50 focus:ring-red-500/30"
                            : "border-slate-700 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                        }`}
                      />
                      {/* Card Type Icon */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {cardType === "visa" && (
                          <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xs">
                              VISA
                            </span>
                          </div>
                        )}
                        {cardType === "mastercard" && (
                          <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center">
                            <div className="flex">
                              <div className="w-3 h-3 bg-red-500 rounded-full -mr-1" />
                              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            </div>
                          </div>
                        )}
                        {cardType === "amex" && (
                          <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              AMEX
                            </span>
                          </div>
                        )}
                        {!cardType && cardData.numero_carte && (
                          <svg
                            className="w-6 h-6 text-slate-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    {cardErrors.numero_carte && (
                      <p className="mt-1 text-xs text-red-400">
                        {cardErrors.numero_carte}
                      </p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nom sur la carte
                    </label>
                    <input
                      type="text"
                      name="nom_carte"
                      value={cardData.nom_carte}
                      onChange={handleCardChange}
                      placeholder="JEAN DUPONT"
                      className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 uppercase ${
                        cardErrors.nom_carte
                          ? "border-red-500/50 focus:ring-red-500/30"
                          : "border-slate-700 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                      }`}
                    />
                    {cardErrors.nom_carte && (
                      <p className="mt-1 text-xs text-red-400">
                        {cardErrors.nom_carte}
                      </p>
                    )}
                  </div>

                  {/* Expiration & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        name="date_expiration"
                        value={cardData.date_expiration}
                        onChange={handleCardChange}
                        placeholder="MM/AA"
                        maxLength={5}
                        className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                          cardErrors.date_expiration
                            ? "border-red-500/50 focus:ring-red-500/30"
                            : "border-slate-700 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                        }`}
                      />
                      {cardErrors.date_expiration && (
                        <p className="mt-1 text-xs text-red-400">
                          {cardErrors.date_expiration}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                            cardErrors.cvv
                              ? "border-red-500/50 focus:ring-red-500/30"
                              : "border-slate-700 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                          }`}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <svg
                            className="w-5 h-5 text-slate-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      {cardErrors.cvv && (
                        <p className="mt-1 text-xs text-red-400">
                          {cardErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 disabled:text-slate-400 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 disabled:shadow-none flex items-center justify-center gap-2 mt-6"
                  >
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <span>Payer {calculatePrice()} €</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Achat;
