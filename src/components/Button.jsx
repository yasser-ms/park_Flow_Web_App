import React from "react";

function Button({ type, disabled, loading, loadingMSG, name }) {
  return (
    <button
      type={type} //"submit"
      disabled={disabled} //{formLoading}
      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 disabled:text-slate-400 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 disabled:shadow-none flex items-center justify-center gap-2"
    >
      {
        /*formLoading*/ loading ? (
          <>
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>
              {" "}
              {loadingMSG} {/*Ajout en cours...*/}
            </span>
          </>
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>
              {name} {/*Ajouter le véhicule*/}
            </span>
          </>
        )
      }
    </button>
  );
}

export default Button;
