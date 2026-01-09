import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/api";

// Regex patterns
const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const phoneRegex = /^\+?[0-9]{8,15}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function Register() {
  const nomRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  // Form fields
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Focus on first input on load
  useEffect(() => {
    nomRef.current.focus();
  }, []);

  // Validate email
  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);

  // Validate phone
  useEffect(() => {
    setValidPhone(phoneRegex.test(phone));
  }, [phone]);

  // Validate password and match
  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
    setValidMatch(password === matchPassword && matchPassword !== "");
  }, [password, matchPassword]);

  // Clear error on input change
  useEffect(() => {
    setErrMsg("");
  }, [nom, prenom, email, phone, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validEmail || !validPhone || !validPassword || !validMatch) {
      setErrMsg("Veuillez remplir tous les champs correctement");
      return;
    }

    if (!nom || !prenom || !dateNaissance) {
      setErrMsg("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/auth/register", {
        nom,
        prenom,
        date_de_naissance: dateNaissance,
        adresse_mail: email,
        num_telephone: phone,
        password,
      });

      // Save token
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.client));

      // Redirect to home
      navigate("/home");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Pas de réponse du serveur");
      } else if (err.response?.status === 409) {
        setErrMsg("Cette adresse email est déjà utilisée");
      } else {
        setErrMsg(err.response?.data?.error || "Erreur lors de l'inscription");
      }
      errRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Input component for reusability
  const InputField = ({
    label,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    isValid,
    showValidation,
    validationMessage,
    inputRef,
    required = true,
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        <span className="flex items-center gap-2">
          {label}
          {value && showValidation !== false && (
            <span className={isValid ? "text-emerald-400" : "text-red-400"}>
              <FontAwesomeIcon
                icon={isValid ? faCheck : faTimes}
                className="text-xs"
              />
            </span>
          )}
        </span>
      </label>
      <input
        type={type}
        ref={inputRef}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
          value && showValidation !== false
            ? isValid
              ? "border-emerald-500/50 focus:ring-emerald-500/30"
              : "border-red-500/50 focus:ring-red-500/30"
            : "border-slate-700 focus:ring-emerald-500/30 focus:border-emerald-500/50"
        }`}
        required={required}
      />
      {validationMessage && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-amber-400 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          {validationMessage}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-slate-950 font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-semibold text-white tracking-tight">
              Park<span className="text-emerald-400">Flow</span>
            </span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl" />

          {/* Card Content */}
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                Créer un compte
              </h1>
              <p className="text-slate-400 text-sm">
                Rejoignez ParkFlow et simplifiez votre stationnement
              </p>
            </div>

            {/* Error Alert */}
            {errMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                ref={errRef}
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
                <span className="text-red-400 text-sm">{errMsg}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom & Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Moussaoui"
                  isValid={nom.length > 0}
                  showValidation={false}
                  inputRef={nomRef}
                />
                <InputField
                  label="Prénom"
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Yasser"
                  isValid={prenom.length > 0}
                  showValidation={false}
                />
              </div>

              {/* Date de naissance */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-200"
                  required
                />
              </div>

              {/* Email */}
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="exemple@email.com"
                isValid={validEmail}
                validationMessage={
                  emailFocus && email && !validEmail
                    ? "Entrez une adresse email valide."
                    : null
                }
              />

              {/* Téléphone */}
              <InputField
                label="Téléphone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
                placeholder="+33612345678"
                isValid={validPhone}
                validationMessage={
                  phoneFocus && phone && !validPhone
                    ? "8 à 15 chiffres. Peut commencer par +."
                    : null
                }
              />

              {/* Password */}
              <InputField
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                placeholder="••••••••"
                isValid={validPassword}
                validationMessage={
                  passwordFocus && !validPassword
                    ? "8+ caractères. Majuscule, minuscule, chiffre et caractère spécial (@$!%*?&#)."
                    : null
                }
              />

              {/* Confirm Password */}
              <InputField
                label="Confirmer mot de passe"
                type="password"
                value={matchPassword}
                onChange={(e) => setMatchPassword(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                placeholder="••••••••"
                isValid={validMatch}
                validationMessage={
                  matchFocus && !validMatch
                    ? "Doit correspondre au mot de passe."
                    : null
                }
              />

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          password.length >= level * 2 &&
                          (level <= 2 || validPassword)
                            ? level <= 1
                              ? "bg-red-500"
                              : level <= 2
                              ? "bg-amber-500"
                              : level <= 3
                              ? "bg-emerald-500"
                              : "bg-emerald-400"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    {!validPassword
                      ? "Mot de passe faible"
                      : "Mot de passe fort"}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !nom ||
                  !prenom ||
                  !dateNaissance ||
                  !validEmail ||
                  !validPhone ||
                  !validPassword ||
                  !validMatch ||
                  loading
                }
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 disabled:text-slate-400 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 disabled:shadow-none flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
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
                    <span>Création en cours...</span>
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-slate-500">ou</span>
              </div>
            </div>

            {/* Social Register */}
            <button
              type="button"
              className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </button>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-4 text-center text-xs text-slate-500">
              En créant un compte, vous acceptez nos{" "}
              <a href="#" className="text-slate-400 hover:text-white underline">
                Conditions d'utilisation
              </a>{" "}
              et notre{" "}
              <a href="#" className="text-slate-400 hover:text-white underline">
                Politique de confidentialité
              </a>
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-2"
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
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;