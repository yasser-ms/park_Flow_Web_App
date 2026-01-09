import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api/api";
import {
  NavbarHomePage,
  StatCard,
  InfoRow,
  Background,
} from "../../components";
import { Greeting } from "../../sections/index.js";
import { quickActions, colorClasses } from "../../utils/index.jsx";
function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.getMe();
        setUser(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("user");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError("Erreur lors du chargement des informations utilisateur.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-emerald-500"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-slate-400">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-4 max-w-md"
        >
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-red-400"
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
          <div>
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-red-400/60 text-sm mt-1">
              Redirection vers la page de connexion...
            </p>
          </div>
        </motion.div>
      </div>
    );
    /* UTILS */
  }
  {
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Elements */}
      <Background />
      <NavbarHomePage user={user} />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome sec */}
        <Greeting user={user} />

        {/* Stats ccards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            label="Véhicules"
            value="3"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 17h8M8 17v-4m8 4v-4m-8 0h8m-8 0V9a1 1 0 011-1h6a1 1 0 011 1v4"
                />
              </svg>
            }
            trend="+1 ce mois"
            trendUp={true}
          />
          <StatCard
            label="Contrats actifs"
            value="2"
            icon={
              <svg
                className="w-5 h-5"
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
            }
            trend="1 expire bientôt"
            trendUp={false}
          />
          <StatCard
            label="Total dépensé"
            value="156€"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            trend="Ce mois"
            trendUp={null}
          />
          <StatCard
            label="Entrées/Sorties"
            value="24"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            }
            trend="Ce mois"
            trendUp={null}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => navigate(action.route)}
                className={`p-5 rounded-2xl border ${
                  colorClasses[action.color].bg
                } ${colorClasses[action.color].border} ${
                  colorClasses[action.color].hover
                } transition-all duration-300 text-left group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${
                    colorClasses[action.color].bg
                  } flex items-center justify-center mb-4 ${
                    colorClasses[action.color].icon
                  } group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-400">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Userinfoo Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-semibold text-white">
              Mes informations
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="ID Client" value={user?.id_client} />
              <InfoRow
                label="Nom complet"
                value={`${user?.prenom} ${user?.nom}`}
              />
              <InfoRow label="Email" value={user?.adresse_mail} />
              <InfoRow label="Téléphone" value={user?.num_telephone} />
              <InfoRow
                label="Date de naissance"
                value={user?.date_de_naissance}
              />
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <button
                onClick={() => navigate("/profil")}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors inline-flex items-center gap-2"
              >
                Modifier mes informations
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Info Row Component

export default Home;
