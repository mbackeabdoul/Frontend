import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [donne, setDonne] = useState({
    nomFormation: "",
    dateFormation: "",
    maxParticipants: "",
    thematique: "",
    prix: "",
  });
  const [modifi, setModifi] = useState(false);
  const [identifiant, setId] = useState(null);

  // Charger les données au démarrage
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour récupérer les données du backend
  const fetchData = () => {
    axios
      .get('http://localhost:3001/api/formations')
      .then(response => {
        // console.log('Données reçues:', response.data);
        setNotes(response.data);
      })
      .catch(error => console.error('Erreur:', error));
  };

  // Fonction pour ajouter ou modifier une formation
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = { ...donne };
  
    if (modifi) {  // Si on est en mode modification
      axios
        .put(`http://localhost:3001/api/formations/${identifiant}`, noteObject)
        .then((response) => {
          // Mettre à jour l'état avec la formation modifiée
          setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note =>
              note._id === identifiant ? response.data : note
            );
            return updatedNotes;
          });
          fetchData();  
          resetForm();  // Réinitialiser le formulaire après la modification
        })
        .catch(error => console.error('Erreur:', error));
    } else {  // Si on est en mode ajout
      axios
        .post('http://localhost:3001/api/formations', noteObject)
        .then((response) => {
          console.log('Formation ajoutée:', response.data);
          fetchData();  // Mettre à jour la liste des formations après ajout
          resetForm();  // Réinitialiser le formulaire après l'ajout
        })
        .catch(error => {
          console.error('Erreur:', error.response?.data || error);
        });
    }
  };
  

  // Fonction pour supprimer une formation
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3001/api/formations/${id}`)
      .then(() => fetchData())  // Rafraîchir les données après suppression
      .catch(error => console.error('Erreur lors de la suppression:', error));
  };

//   Pré-remplir le formulaire pour la modification
  const updater = (id) => {
    const note = notes.find(n => n._id === id);
    setModifi(true);
    setId(id);
    setDonne({
      nomFormation: note.nomFormation,
      dateFormation: note.dateFormation,
      maxParticipants: note.maxParticipants,
      thematique: note.thematique,
      prix: note.prix,
    });
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setDonne({
      nomFormation: "",
      dateFormation: "",
      maxParticipants: "",
      thematique: "",
      prix: "",
    });
    setModifi(false);
    setId(null);
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonne(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid flex flex-col">
      <h1 className="font-bold text-center my-5 text-2xl">Gestion des Formations</h1>
      <form onSubmit={addNote} className="bg-white p-5 shadow-md rounded mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Nom de la formation</label>
            <input
              type="text"
              name="nomFormation"
              value={donne.nomFormation}
              onChange={handleChange}
              className="input border w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label>Date de la formation</label>
            <input
              type="date"
              name="dateFormation"
              value={donne.dateFormation}
              onChange={handleChange}
              className="input border w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label>Nombre de participants max</label>
            <input
              type="number"
              name="maxParticipants"
              value={donne.maxParticipants}
              onChange={handleChange}
              className="input border w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label>Thématique</label>
            <input
              type="text"
              name="thematique"
              value={donne.thematique}
              onChange={handleChange}
              className="input border w-full p-2 rounded"
              required
            />
          </div>
          <div>
            <label>Prix</label>
            <input
              type="number"
              step="0.01"
              name="prix"
              value={donne.prix}
              onChange={handleChange}
              className="input border w-full p-2 rounded"
              required
            />
          </div>
        </div>
        <button
  type="submit"
  className="mt-5 w-1/3 bg-sky-500 text-white py-2 rounded font-semibold shadow text-sm mx-auto block"
>
  {modifi ? "Modifier" : "Ajouter"}
</button>

      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map(note => (
        <div key={note._id} className="card bg-gray-100 p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">{note.nomFormation}</h2>
        <p>Date: {note.dateFormation ? new Date(note.dateFormation).toLocaleDateString() : "Non spécifiée"}</p>
        <p>Participants max: {note.maxParticipants || "Non spécifié"}</p>
        <p>Thématique: {note.thematique || "Non spécifiée"}</p>
        <p>Prix: {note.prix || 0} €</p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => updater(note._id)}
            className="bg-yellow-500 text-white px-3 py-1 rounded shadow"
          >
            Modifier
          </button>
          <button
            onClick={() => deleteNote(note._id)}
            className="bg-red-500 text-white px-3 py-1 rounded shadow"
          >
            Supprimer
          </button>
        </div>
      </div>
      
        ))}
      </div>
    </div>
  );
};

export default App;
