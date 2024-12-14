import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [donne, setDonne] = useState({ prenom: "", email: "", telephone: "" });
  const [modifi, setModifi] = useState(false);
  const [identifiant, setId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/formations')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Erreur lors du chargement des données:', error));
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = { ...donne };

    if (modifi) {
      axios
        .put(`http://localhost:3001/api/formations/${identifiant}`, noteObject)
        .then(() => {
          setDonne({ prenom: "", email: "", telephone: "" });
          setModifi(false);
        })
        .catch(error => console.error('Erreur lors de la modification de la note:', error));
    } else {
      axios
        .post('http://localhost:3001/api/formations', noteObject)
        .then(response => {
          setNotes([...notes, response.data]);
          setDonne({ prenom: "", email: "", telephone: "" });
        })
        .catch(error => console.error('Erreur lors de l\'ajout de la note:', error));
    }
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:3001/api/formations/${id}`)
      .then(() => setNotes(notes.filter(note => note._id !== id)))
      .catch(error => console.error('Erreur lors de la suppression de la note:', error));
  };

  const updater = (id) => {
    const note = notes.find(n => n._id === id);
    setModifi(true);
    setId(id);
    setDonne({ prenom: note.prenom, email: note.email, telephone: note.telephone });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonne(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center my-8 text-sky-700">Gestion des Notes</h1>
      <form onSubmit={addNote} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={donne.prenom}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={donne.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Téléphone</label>
          <input
            type="number"
            name="telephone"
            value={donne.telephone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {modifi ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold my-5">Liste des Notes</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Prénom</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Téléphone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{note.prenom}</td>
                <td className="border border-gray-300 px-4 py-2">{note.email}</td>
                <td className="border border-gray-300 px-4 py-2">{note.telephone}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    onClick={() => updater(note._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
