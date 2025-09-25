import type { Tarefa } from '../interfaces/Tarefa';
import { useFavorites } from '../context/FavoritesContext';


interface TarefaItemProps {
  tarefa: Tarefa;
  onToggle: (id: number) => void;
}

export function TarefaItem({ tarefa, onToggle }: TarefaItemProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === tarefa.id);

  return (
    <li className={`p-4 rounded-md flex items-center shadow-md transition-all ${tarefa.isDone ? 'bg-slate-800/50' : 'bg-slate-800'}`}>
      <input
        type="checkbox"
        checked={tarefa.isDone }
        onChange={() => onToggle(tarefa.id)}
        className="form-checkbox h-5 w-5 bg-slate-700 border-slate-600 rounded text-blue-500 focus:ring-blue-500"
      />Finalizar
      <div className="ml-4 flex-grow">
        <span className={`${tarefa.isDone  ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
          {tarefa.text}
        </span>
      </div>
      <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={() => toggleFavorite(tarefa)}
        >
          {isFavorite ? 'Remover Favorito ❤️' : 'Favoritar ⭐'}
        </button>
    </li>
  );
}