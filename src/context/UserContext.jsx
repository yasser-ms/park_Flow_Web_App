import { createContext, useContext, useState } from "react";
import API from "../api/api.js";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await API.login(email, password);
      localStorage.setItem("user", JSON.stringify(res.data.client));
      navigate("/home");
    } catch (err) {
      if (!err.response) {
        setErrMsg("Pas de réponse du serveur");
      } else if (err.response.status === 401) {
        setErrMsg("Email ou mot de passe incorrect");
      } else {
        setErrMsg(err.response?.data?.error || "Erreur de connexion");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
     try {
          await API.logout();
          localStorage.removeItem("user");
          navigate("/login");
        } catch (err) {
          console.error("Erreur lors de la déconnexion:", err);
        } finally {
    
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook (très important pour la propreté du code)
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return context;
};
