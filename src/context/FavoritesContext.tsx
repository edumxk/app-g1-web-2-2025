import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Tarefa } from '../interfaces/Tarefa';

interface FavoritesContextType {
  favorites: Tarefa[];
  toggleFavorite: (item: Tarefa) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Tarefa[]>([]);

  const toggleFavorite = (item: Tarefa) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === item.id);

    if (isAlreadyFavorite) {
      setFavorites(currentFavorites =>
        currentFavorites.filter(fav => fav.id !== item.id)
      );
    } else {
      setFavorites(currentFavorites => [...currentFavorites, item]);
    }
  };

  const value = { favorites, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}