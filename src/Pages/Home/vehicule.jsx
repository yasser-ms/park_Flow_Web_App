import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/api";
import {
  vehicleTypes,
  getTypeIcon,
  getTypeBadgeColor,
} from "../../utils/index.jsx";
import {
  Background,
  NavbarHomePage,
  DeleteModel,
  SuccessErrorMsg,
  ShowVehicules,
  InputHolder,
  DropDown,
  Button,
} from "../../components/index.js";
const matriculeRegex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;

function Vehicules() {
  const navigate = useNavigate();
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    id_vehicule: "",
    type: "voiture",
    modele: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [vehiculeToDelete, setVehiculeToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch vehicules on load

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    try {
      const res = await API.getVehicule();
      setVehicules(res.data.vehicules || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Erreur lors du chargement des véhicules");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "id_vehicule") {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    // Validate matricule format
    if (!matriculeRegex.test(formData.id_vehicule)) {
      setFormError(
        "Format de matricule invalide. Utilisez le format AA-000-AA"
      );
      return;
    }

    if (!formData.modele.trim()) {
      setFormError("Veuillez entrer le modèle du véhicule");
      return;
    }

    setFormLoading(true);

    try {
      await API.addVehicule(formData);
      setSuccess("Véhicule ajouté avec succès");
      setFormData({ id_vehicule: "", type: "voiture", modele: "" });
      fetchVehicules();
    } catch (err) {
      if (err.response?.status === 409) {
        setFormError("Ce véhicule existe déjà");
      } else {
        setFormError(err.response?.data?.error || "Erreur lors de l'ajout");
      }
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteModal = (vehicule) => {
    setVehiculeToDelete(vehicule);
    console.log(vehicule);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!vehiculeToDelete) return;

    setDeleteLoading(true);
    try {
      await API.deleteVehicule(vehiculeToDelete.id_vehicule);
      setSuccess("Véhicule supprimé avec succès");
      setDeleteModal(false);
      setVehiculeToDelete(null);
      fetchVehicules();
    } catch (err) {
      setFormError(
        err.response?.data?.error || "Erreur lors de la suppression"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-950">
      <Background />

      {/* Navbar */}
      <NavbarHomePage />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Mes véhicules</h1>
          <p className="text-slate-400">
            Gérez vos véhicules enregistrés pour le stationnement.
          </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicules List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Liste des véhicules
                </h2>
                <span className="text-sm text-slate-400">
                  {vehicules.length} véhicule{vehicules.length !== 1 ? "s" : ""}
                </span>
              </div>

              <ShowVehicules
                vehicules={vehicules}
                openDeleteModal={openDeleteModal}
                getTypeIcon={getTypeIcon}
                getTypeBadgeColor={getTypeBadgeColor}
              />
            </div>
          </motion.div>

          {/* Add Vehicle Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-white">
                  Ajouter un véhicule
                </h2>
              </div>

              <div className="p-6">
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"
                  >
                    <span className="text-red-400 text-sm">{formError}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Matricule */}
                  <InputHolder
                    label="Matricules"
                    name="id_vehicule"
                    type="text"
                    value={formData.id_vehicule}
                    onChange={handleChange}
                    placeholder="AA-000-BB"
                    maxLength={9}
                  />

                  {/* Type */}
                  <div>
                    <div className="relative">
                      <DropDown
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        vehicleTypes={vehicleTypes}
                      />
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Modèle */}
                  <div>
                    <InputHolder
                      label="Modèle"
                      type="text"
                      name="modele"
                      value={formData.modele}
                      onChange={handleChange}
                      placeholder="ex: Peugeot 208, BMW X5..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={formLoading}
                    loading={formLoading}
                    loadingMSG="Ajout en cours..."
                    name="Ajouter le vehicule"
                  />
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <DeleteModel
            vehiculeToDelete={vehiculeToDelete}
            handleDelete={handleDelete}
            deleteLoading={deleteLoading}
            setDeleteModal={setDeleteModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Vehicules;
