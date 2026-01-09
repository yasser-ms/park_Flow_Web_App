export const quickActions = [
  {
    title: "Mes Véhicules",
    description: "Gérer vos véhicules enregistrés",
    icon: (
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
          d="M8 17h8M8 17v-4m8 4v-4m-8 0h8m-8 0V9a1 1 0 011-1h6a1 1 0 011 1v4M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
    route: "/vehicules",
    color: "emerald",
  },
  {
    title: "Mes Contrats",
    description: "Voir vos réservations actives",
    icon: (
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
    ),
    route: "/contrats",
    color: "cyan",
  },
  {
    title: "Parkings",
    description: "Trouver une place disponible",
    icon: (
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
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    route: "/parkings",
    color: "violet",
  },
  {
    title: "Paiements",
    description: "Historique des transactions",
    icon: (
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    route: "/paiements",
    color: "amber",
  },
];

export const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    hover: "hover:border-emerald-500/40 hover:bg-emerald-500/15",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "text-cyan-400",
    hover: "hover:border-cyan-500/40 hover:bg-cyan-500/15",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-400",
    hover: "hover:border-violet-500/40 hover:bg-violet-500/15",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    hover: "hover:border-amber-500/40 hover:bg-amber-500/15",
  },
};

export const vehicleTypes = [
  { value: "voiture", label: "Voiture" },
  { value: "moto", label: "Moto" },
  { value: "camion", label: "Camion" },
  { value: "bus", label: "Bus" },
  { value: "utilitaire", label: "Utilitaire" },
];

export const getTypeIcon = (type) => {
  switch (type) {
    case "voiture":
      return (
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
            d="M8 17h8M8 17v-4m8 4v-4m-8 0h8m-8 0V9a1 1 0 011-1h6a1 1 0 011 1v4M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
          />
        </svg>
      );
    case "moto":
      return (
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      );
    case "camion":
      return (
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
            d="M8 7h8m-8 4h8m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
          />
        </svg>
      );
    default:
      return (
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
            d="M8 17h8M8 17v-4m8 4v-4m-8 0h8"
          />
        </svg>
      );
  }
};

export const getTypeBadgeColor = (type) => {
  switch (type) {
    case "voiture":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "moto":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    case "camion":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "bus":
      return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "utilitaire":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
};
