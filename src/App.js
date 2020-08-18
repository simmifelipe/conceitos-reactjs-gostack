import React, { useState } from "react";

import "./styles.css";
import { useEffect } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const repositories = await api.get("repositories");

      setRepositories(repositories.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = await api.post("repositories", {
      title: "New Repository",
      url: "http://newrepository.com",
      techs: ["ReactJS", "React Native"],
    });

    const repository = newRepository.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const updatedRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
