import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import image from '../src/images/image.png';
import { 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  TagIcon, 
  DollarSignIcon, 
  EditIcon, 
  TrashIcon 
} from 'lucide-react';

const FormationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormationDetails = async () => {
      try {
        const response = await axios.get(`https://backend-3yq5.onrender.com/api/formations/${id}`);
        setFormation(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error('Erreur de chargement des détails:', error);
        setLoading(false);
      }
    };

    fetchFormationDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?');
      if (confirmDelete) {
        await axios.delete(`https://backend-3yq5.onrender.com/api/formations/${id}`);
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  // Fonction pour formater la date et l'heure
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-blue-700">Chargement de la formation...</p>
        </div>
      </div>
    );
  }

  if (!formation) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-6">Formation Non Trouvée</h2>
          <Link 
            to="/" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
           {/* Ajoutez la Navbar */}
      <Navbar 
        onAddFormation={() => {
          // Action optionnelle si vous voulez une action spécifique
          navigate('/?showForm=true');
        }} 
      />
        {/* En-tête de la formation */}
        <div className="bg-green-600 text-white p-6 text-center">
          <h1 className="text-4xl font-bold mb-2">{formation.nomFormation}</h1>
          <p className="text-green-100">Détails complets de la formation</p>
        </div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Colonne Image */}
          <div className="flex items-center justify-center">
            <img 
              src={image}
              alt={formation.nomFormation}
              className="rounded-xl shadow-lg max-h-96 object-cover"
            />
          </div>

          {/* Colonne Détails */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <CalendarIcon className="mr-3 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Date de Formation</h3>
                  <p className="text-gray-900">
                    {new Date(formation.dateFormation).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <UsersIcon className="mr-3 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Participants Max</h3>
                  <p className="text-gray-900">{formation.maxParticipants} participants</p>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <TagIcon className="mr-3 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Thématique</h3>
                  <p className="text-gray-900">{formation.thematique}</p>
                </div>
              </div>

              <div className="flex items-center">
                <DollarSignIcon className="mr-3 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Prix</h3>
                  <p className="text-gray-900">{formation.prix} FCFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
<div className="p-8 bg-gray-50 border-t">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
  <p className="text-gray-700 leading-relaxed">
    {formation.description || 'Descriptions bi jappandiwul'}
  </p>
</div>

        {/* Informations de création et modification */}
        <div className="p-8 bg-white border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Historique</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <ClockIcon className="mr-3 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Date de Création</h3>
                  <p className="text-gray-900">{formatDateTime(formation.dateAjout)}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <EditIcon className="mr-3 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-gray-700">Dernière Modification</h3>
                  <p className="text-gray-900">
                    {formation.dateModification 
                      ? formatDateTime(formation.dateModification)
                      : 'Aucune modification'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-8 bg-gray-100 flex justify-center space-x-4">
          <Link 
            to={`/?edit=${id}`}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center"
          >
            <EditIcon className="mr-2" /> Modifier
          </Link>
          <button 
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
          >
            <TrashIcon className="mr-2" /> Supprimer
          </button>
        </div>

        {/* Retour */}
        <div className="p-4 text-center bg-white">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center justify-center"
          >
            ← Retour à la liste des formations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormationDetails;