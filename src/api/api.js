import axios from "axios";

const API = axios.create({
  baseURL: "https://park-flow-backend.onrender.com",
  withCredentials: true,
});

let csrfToken = null;

// Add token to requests
API.interceptors.request.use((config) => {
  if (["post", "put", "patch", "delete"].includes(config.method)) {
    // Get the csrf token from cookies
    const csrf = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_access_token="))
      ?.split("=")[1];
    if (csrf) {
      config.headers["X-CSRF-TOKEN"] = csrf;
    }
  }
  return config;
});

// Handle responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access, redirecting to login");
    }
    return Promise.reject(error);
  }
);

// Handle login request
API.login = async (email, password) => {
  const response = await API.post("/auth/login", {
    adresse_mail: email,
    password,
  });
  if (response.data.csrf_token) csrfToken = response.data.csrf_token;
  return response;
};

API.getMe = () => {
  return API.get("/auth/me");
};

API.logout = async () => {
  const response = await API.post("/auth/logout");
  csrfToken = null;
  return response;
};

API.estDisponible = async () => {
  const response = await API.get("/places/est_dispo");
  return response;
};

API.getPlaces = async () => {
  const response = await API.get("/places");
  return response;
};

API.getContrats = async () => {
  const response = await API.get("/contrats/active");
  return response;
};

API.getMontant = async () => {
  const response = await API.get("/paiement/montant");
  return response;
};

API.getVehicule = async () => {
  const response = await API.get("/vehicules/");
  return response;
};

API.addVehicule = async (formData) => {
  const response = await API.post("/vehicules/", formData);
  return response;
};

API.deleteVehicule = async (id_vehicule) => {
  const response = await API.delete(`/vehicules/${id_vehicule}`);
  return response;
};

API.getUserContrats = async () => {
  const response = await API.get("/contrats/");
  return response;
};

API.getAbn = async (id_contrat) => {
  const response = await API.get(`/contrats/${id_contrat}/abn`);
  return response;
};

API.getTkh = async (id_contrat) => {
  const response = await API.get(`/contrats/${id_contrat}/tk`);
  return response;
};

API.deleteContrat = async (id_contrat) => {
  const response = await API.delete(`/contrats/${id_contrat}`);
  return response;
};

API.getIdParkingByPlace = async (id_place) => {
  const response = await API.get(`/parkings/${id_place}`);
  return response;
};

export default API;