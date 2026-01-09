import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navLinks = [
    { title: "Fonctionnalités", url: "#features" },
    { title: "Comment ça marche", url: "#how-it-works" },
    { title: "Tarifs", url: "#pricing" },
    { title: "Contact", url: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-slate-950 font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Park<span className="text-emerald-400">Flow</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-slate-300 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;