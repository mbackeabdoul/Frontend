import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, HomeIcon, Menu, X } from 'lucide-react';
import logo from '../src/images/logo.png';

const Navbar = ({ onAddFormation }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-10 w-auto mr-4"
          />
          <span className="text-xl font-bold text-green-600">Daarul Mahaarifi Islaamiyya</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="flex items-center text-gray-700 hover:text-green-600 transition duration-300"
          >
            <HomeIcon className="mr-2" /> Accueil
          </Link>
          <button 
            onClick={onAddFormation}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            <PlusIcon className="mr-2" /> Ajouter Formation
          </button>
        </div>

        {/* Menu hamburgers pour mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-green-600 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <HomeIcon className="mr-2 h-5 w-5 inline-block" /> Accueil
            </Link>
            <button 
              onClick={() => {
                onAddFormation();
                setMenuOpen(false);
              }}
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
