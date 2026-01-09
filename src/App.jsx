import {
  Register,
  Login,
  Dashboard,
  Home,
  Vehicule,
  Contrat,
  Parking,
  Paiement,
  Achat,
} from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicules" element={<Vehicule />} />
        <Route path="/contrats" element={<Contrat />} />
        <Route path="/parkings" element={<Parking />} />
        <Route path="/paiements" element={<Paiement />} />
        <Route path="/achat" element={<Achat />} />
      </Routes>
    </Router>
  );
}

export default App;
