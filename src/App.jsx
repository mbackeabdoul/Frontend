// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import axios from 'axios';
// import FormationDetails from './FormationDetails'; // Assurez-vous d'importer le composant
// import image from '../src/images/image.png'

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [donne, setDonne] = useState({
//     nomFormation: "",
//     dateFormation: "",
//     maxParticipants: "",
//     thematique: "",
//     prix: "",
//   });
//   const [modifi, setModifi] = useState(false);
//   const [identifiant, setId] = useState(null);
//   const [showForm, setShowForm] = useState(false); 
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axios
//       .get('https://backend-3yq5.onrender.com/api/formations') 
//       .then(response => {
//         setNotes(response.data);
//       })
//       .catch(error => console.error('Erreur:', error));
//   };


//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = { ...donne };
  
//     if (modifi) {
//       axios
//         .put(`https://backend-3yq5.onrender.com/api/formations/${identifiant}`, noteObject)
//         .then((response) => {
//           setNotes(prevNotes => 
//             prevNotes.map(note => 
//               note._id === identifiant ? { ...note, ...noteObject } : note
//             )
//           );
//           resetForm();
//           setShowForm(false); 
//         })
//         .catch(error => {
//           console.error('Erreur:', error);
//           fetchData();
//         });
//     } else {
//       axios
//         .post('https://backend-3yq5.onrender.com/api/formations', noteObject)
//         .then((response) => {
//           setNotes(prevNotes => [...prevNotes, response.data]);
//           resetForm();
//           setShowForm(false); 
//         })
//         .catch(error => {
//           console.error('Erreur:', error.response?.data || error);
//           fetchData();
//         });
//     }
//   };

//   const resetForm = () => {
//     setDonne({
//       nomFormation: "",
//       dateFormation: "",
//       maxParticipants: "",
//       thematique: "",
//       prix: "",
//     });
//     setModifi(false);
//     setId(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDonne(prev => ({ ...prev, [name]: value }));
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//     resetForm();
//   };

//   const updater = (id) => {
//     setShowForm(true);
//     setModifi(true);
//     setId(id);
//     const note = notes.find(note => note._id === id);
//     setDonne({
//       nomFormation: note.nomFormation,
//       dateFormation: note.dateFormation,
//       maxParticipants: note.maxParticipants,
//       thematique: note.thematique,
//       prix: note.prix,
//     });
//   };

//   const deleteNote = (id) => {
//     const updatedNotes = notes.filter(note => note._id !== id);
//     setNotes(updatedNotes);

//     axios
//       .delete(`https://backend-3yq5.onrender.com/api/formations/${id}`)
//       .catch(error => {
//         console.error('Erreur:', error);
//         fetchData();
//       });
//   };

//   const handleSearch = (e) => {
//     setQuery(e.target.value.toLowerCase());
//   };

//   const filteredNotes = notes.filter(note => 
//     note.nomFormation.toLowerCase().includes(query) || 
//     note.thematique.toLowerCase().includes(query)
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-green-500 text-white p-4">
//         <div className="flex justify-between items-center container mx-auto">
//           <h1 className="text-xl font-bold">Gestion des Formations</h1>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:underline">Accueil</a>
//             <a href="#" className="hover:underline">Contact</a>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto p-5 flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Rechercher une formation"
//           value={query}
//           onChange={handleSearch}
//           className="border p-3 rounded-lg w-full md:w-1/2"
//         />
//         <button
//           onClick={toggleForm}
//           className="bg-green-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-600 ml-4"
//         >
//           Ajouter une formation
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={addNote} className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto mb-10">
//           {/* {showForm && (
//         <form onSubmit={addNote} className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto mb-10"> */}
//           <h2 className="text-2xl font-semibold text-center mb-6">{modifi ? 'Modifier la Formation' : 'Ajouter une Formation'}</h2>
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <label htmlFor="nomFormation" className="block text-sm font-medium text-gray-700 mb-2">Nom de la formation</label>
//               <input
//                 type="text"
//                 name="nomFormation"
//                 id="nomFormation"
//                 value={donne.nomFormation}
//                 onChange={handleChange}
//                 className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="dateFormation" className="block text-sm font-medium text-gray-700 mb-2">Date de la formation</label>
//               <input
//                 type="date"
//                 name="dateFormation"
//                 id="dateFormation"
//                 value={donne.dateFormation}
//                 onChange={handleChange}
//                 className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">Nombre de participants max</label>
//               <input
//                 type="number"
//                 name="maxParticipants"
//                 id="maxParticipants"
//                 value={donne.maxParticipants}
//                 onChange={handleChange}
//                 className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="thematique" className="block text-sm font-medium text-gray-700 mb-2">Thématique</label>
//               <input
//                 type="text"
//                 name="thematique"
//                 id="thematique"
//                 value={donne.thematique}
//                 onChange={handleChange}
//                 className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-2">Prix</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="prix"
//                 id="prix"
//                 value={donne.prix}
//                 onChange={handleChange}
//                 className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//             >
//               {modifi ? "Modifier" : "Ajouter"}
//             </button>
//             <button
//               type="button"
//               onClick={() => { resetForm(); setShowForm(false); }}
//               className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
//             >
//               Annuler
//             </button>
//           </div>
//         </form>
//       )}

// <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
//   {!showForm && filteredNotes.map(note => (
//    <Link to={`/formation/${note._id}`} 
//    key={note._id}
//       className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full"
//     >
//       {/* Carte */}
//       <div className="flex flex-col h-full">
//         {/* Image */}
//         <div className="h-40 w-full">
//           <img 
//             src={image}
//             alt={note.nomFormation}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Texte */}
//         <div className="p-4 flex flex-col justify-between h-full">
//           <h3 className="text-lg font-bold text-gray-800 mb-2">
//             {note.nomFormation}
//           </h3>
//           <p className="text-gray-600 text-sm mb-1">Date : {new Date(note.dateFormation).toLocaleDateString()}</p>
//           <p className="text-gray-600 text-sm mb-1">Participants : {note.maxParticipants}</p>
//           <p className="text-gray-600 text-sm mb-1">Thématique : {note.thematique}</p>
//           <p className="text-gray-800 text-sm font-semibold">Prix : {note.prix} FCFA</p>
//         </div>
//       </div>
//     </Link>
//   ))}
// </div>






//     </div>
//   );
// };

// // Wrapper component with Router
// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />} />

//         <Route path="/formation/:id" element={<FormationDetails />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import image from '../src/images/image.png';
import Navbar from './Navbar'; // Importez le composant Navbar
import FormationDetails from './FormationDetails'; // Ajoutez cette ligne d'import
const App = () => {
  const [notes, setNotes] = useState([]);
  const [donne, setDonne] = useState({
    nomFormation: "",
    dateFormation: "",
    maxParticipants: "",
    thematique: "",
    prix: "",
    description: "", // N'oubliez pas d'ajouter la description
  });
  
  // Nouveautés : gestion de l'édition
  const [modifi, setModifi] = useState(false);
  const [identifiant, setId] = useState(null);
  
  const [showForm, setShowForm] = useState(false); 
  const [query, setQuery] = useState("");
  
  // Ajoutez useLocation pour lire les paramètres de l'URL
  const location = useLocation();

   // Méthode pour afficher le formulaire
   const handleAddFormation = () => {
    setShowForm(true);
    resetForm();
  };

  useEffect(() => {
    fetchData();
    
    // Nouvelle logique pour détecter l'édition via l'URL
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
    
    // Si un ID d'édition est présent dans l'URL
    if (editId) {
      // Trouver la formation à éditer dans la liste des notes
      const formationToEdit = notes.find(note => note._id === editId);
      
      if (formationToEdit) {
        // Pré-remplir le formulaire avec les données de la formation
        setDonne({
          nomFormation: formationToEdit.nomFormation,
          dateFormation: formationToEdit.dateFormation,
          maxParticipants: formationToEdit.maxParticipants,
          thematique: formationToEdit.thematique,
          prix: formationToEdit.prix,
          description: formationToEdit.description || "", // Ajoutez la description
        });
        
        // Activer le mode modification
        setModifi(true);
        setShowForm(true);
        setId(editId);
      }
    }
  }, [location.search, notes.length]); // Dépendances pour re-déclencher l'effet

  // Le reste de votre code reste identique
  const fetchData = () => {
    axios
      .get('https://backend-3yq5.onrender.com/api/formations') 
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => console.error('Erreur:', error));
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = { ...donne };
  
    if (modifi) {
      // Logique de modification
      axios
        .put(`https://backend-3yq5.onrender.com/api/formations/${identifiant}`, noteObject)
        .then((response) => {
          // Mettre à jour la liste des notes
          setNotes(prevNotes => 
            prevNotes.map(note => 
              note._id === identifiant ? { ...note, ...noteObject } : note
            )
          );
          resetForm();
          setShowForm(false); 
        })
        .catch(error => {
          console.error('Erreur:', error);
          fetchData();
        });
    } else {
      // Logique d'ajout (reste identique)
      axios
        .post('https://backend-3yq5.onrender.com/api/formations', noteObject)
        .then((response) => {
          setNotes(prevNotes => [...prevNotes, response.data]);
          resetForm();
          setShowForm(false); 
        })
        .catch(error => {
          console.error('Erreur:', error.response?.data || error);
          fetchData();
        });
    }
  };

  // Le reste de votre code reste identique
  const resetForm = () => {
    setDonne({
      nomFormation: "",
      dateFormation: "",
      maxParticipants: "",
      thematique: "",
      prix: "",
      description:""
    });
    setModifi(false);
    setId(null);
  };

  const handleChange = (e) => {
        const { name, value } = e.target;
        setDonne(prev => ({ ...prev, [name]: value }));
      };
    
      const toggleForm = () => {
        setShowForm(!showForm);
        resetForm();
      };
    
      const updater = (id) => {
        setShowForm(true);
        setModifi(true);
        setId(id);
        const note = notes.find(note => note._id === id);
        setDonne({
          nomFormation: note.nomFormation,
          dateFormation: note.dateFormation,
          maxParticipants: note.maxParticipants,
          thematique: note.thematique,
          prix: note.prix,
        });
      };
    
      const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note._id !== id);
        setNotes(updatedNotes);
    
        axios
          .delete(`https://backend-3yq5.onrender.com/api/formations/${id}`)
          .catch(error => {
            console.error('Erreur:', error);
            fetchData();
          });
      };
    
      const handleSearch = (e) => {
        setQuery(e.target.value.toLowerCase());
      };
    
      const filteredNotes = notes.filter(note => 
        note.nomFormation.toLowerCase().includes(query) || 
        note.thematique.toLowerCase().includes(query)
      );
  return (

    // Votre code de rendu reste identique
    <div className="min-h-screen bg-gray-50 pt-20"> {/* Ajoutez pt-20 pour compenser la navbar fixe */}          
    {/* <nav className="bg-green-500 text-white p-4">
           <div className="flex justify-between items-center container mx-auto">
              <h1 className="text-xl font-bold">Gestion des Formations</h1>
            <div className="flex space-x-4">
               <a href="#" className="hover:underline">Accueil</a>
               <a href="#" className="hover:underline">Contact</a>
              </div>
             </div>
          </nav> */}
         {/* Ajoutez la Navbar ici */}
         <Navbar onAddFormation={handleAddFormation} />

{/* Votre barre de recherche */}
<div className="container mx-auto p-5 flex justify-between items-center">
  <input
    type="text"
    placeholder="Rechercher une formation"
    value={query}
    onChange={handleSearch}
    className="border p-3 rounded-lg w-full md:w-1/2"
  />
            {/* <button
              onClick={toggleForm}
              className="bg-green-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-600 ml-4"
            >
              Ajouter une formation
            </button> */}
          </div>
    
          {showForm && (
            <form onSubmit={addNote} className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto mb-10">
              {/* {showForm && (
            <form onSubmit={addNote} className="bg-white p-6 shadow-lg rounded-lg max-w-md mx-auto mb-10"> */}
              <h2 className="text-2xl font-semibold text-center mb-6">{modifi ? 'Modifier la Formation' : 'Ajouter une Formation'}</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="nomFormation" className="block text-sm font-medium text-gray-700 mb-2">Nom de la formation</label>
                  <input
                    type="text"
                    name="nomFormation"
                    id="nomFormation"
                    value={donne.nomFormation}
                    onChange={handleChange}
                    className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="dateFormation" className="block text-sm font-medium text-gray-700 mb-2">Date de la formation</label>
                  <input
                    type="date"
                    name="dateFormation"
                    id="dateFormation"
                    value={donne.dateFormation}
                    onChange={handleChange}
                    className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">Nombre de participants max</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    id="maxParticipants"
                    value={donne.maxParticipants}
                    onChange={handleChange}
                    className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="thematique" className="block text-sm font-medium text-gray-700 mb-2">Thématique</label>
                  <input
                    type="text"
                    name="thematique"
                    id="thematique"
                    value={donne.thematique}
                    onChange={handleChange}
                    className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
    
                <div>
                  <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-2">Prix</label>
                  <input
                    type="number"
                    step="0.01"
                    name="prix"
                    id="prix"
                    value={donne.prix}
                    onChange={handleChange}
                    className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description de la formation</label>
            <textarea
              name="description"
              id="description"
              value={donne.description}
              onChange={handleChange}
              className="input border w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
              placeholder="Détaillez les objectifs, le contenu et les compétences acquises lors de la formation"
            />
          </div>
              </div>
    
              <div className="mt-6 flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  {modifi ? "Modifier" : "Ajouter"}
                </button>
                <button
                  type="button"
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
    
    <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
      {!showForm && filteredNotes.map(note => (
       <Link to={`/formation/${note._id}`} 
       key={note._id}
          className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full"
        >
          {/* Carte */}
          <div className="flex flex-col h-full">
            {/* Image */}
            <div className="h-40 w-full">
              <img 
                src={image}
                alt={note.nomFormation}
                className="w-full h-full object-cover"
              />
            </div>
    
            {/* Texte */}
            <div className="p-4 flex flex-col justify-between h-full">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {note.nomFormation}
              </h3>
              <p className="text-gray-600 text-sm mb-1 font-semibold">Date : {new Date(note.dateFormation).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm mb-1 font-semibold">Participants : {note.maxParticipants}</p>
              <p className="text-gray-600 text-sm mb-1 font-semibold">Thématique : {note.thematique}</p>
              <p className="text-gray-800 text-sm font-semibold">Prix : {note.prix} FCFA</p>

            </div>
          </div>
        </Link>
      ))}
    </div>
    
    
    
    
    
    
        </div>
      );
    };

// Wrapper component avec Router
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        
        <Route path="/formation/:id" element={<FormationDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;