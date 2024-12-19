import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon, HomeIcon, Menu, X } from 'lucide-react';
import logo from '../src/images/logo.png';

const Navbar = ({ onAddFormation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    setMenuOpen(false);
  };

  const handleAddFormation = () => {
    onAddFormation();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={handleHomeClick} className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-10 w-auto mr-4"
          />
          <span className="text-xl font-bold text-green-600">Daarul Mahaarif Al Islaami</span>
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={handleHomeClick}
            className="flex items-center text-gray-700 hover:text-green-600 transition duration-300"
          >
            <HomeIcon className="mr-2" /> Accueil
          </button>
          <button 
            onClick={handleAddFormation}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            <PlusIcon className="mr-2" /> Ajouter Formation
          </button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 space-y-4">
            <button 
              onClick={handleHomeClick}
              className="block w-full text-left text-gray-700 hover:text-green-600 transition duration-300"
            >
              <HomeIcon className="mr-2 h-5 w-5 inline-block" /> Accueil
            </button>
            <button 
              onClick={handleAddFormation}
              className="block w-full text-left bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <PlusIcon className="mr-2 h-5 w-5 inline-block" /> Ajouter Formation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;