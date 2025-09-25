// src/pages/Favoritos.tsx
import { useFavorites } from '../context/FavoritesContext';
import { TaskList } from '../componentes/TarefaLista';
import { Tarefa } from '../interfaces/Tarefa';
import { useState } from 'react';

function Favoritos() {
  // Acessamos a lista global de favoritos com nosso hook
  const { favorites } = useFavorites();

  const [tasks, setTasks] = useState<Tarefa[]>([]);


  function toggleComplete(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isDone: !task.isDone,
          isFavorite: !task.isFavorite,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  return (
    <div>
      <h2>Página de Favoritos</h2>

      {/* Verificamos se a lista de favoritos está vazia */}
      {favorites.length === 0 ? (
        <p>Você ainda não selecionou nenhum item como favorito.</p>
      ) : (
        <div className="card-grid">
          <TaskList 
                      titulo="Tarefas Favoritas"
                      tarefas={favorites}
                      onToggle={toggleComplete}
                    />
        </div>
      )}
    </div>
  );
}

export default Favoritos;