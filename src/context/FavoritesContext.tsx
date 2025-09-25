import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Tarefa } from '../interfaces/Tarefa';

// 1. DEFININDO O "CONTRATO" DO CONTEXTO
// Esta interface define quais valores e funções nosso contexto vai fornecer.
// Qualquer componente que consumir este contexto saberá que terá acesso a isso.
interface FavoritesContextType {
  favorites: Tarefa[];
  toggleFavorite: (item: Tarefa) => void;
}

// 2. CRIANDO O CONTEXTO
// Criamos o contexto, tipando-o com nossa interface.
// O valor inicial é 'undefined' porque ele só terá um valor real
// quando estiver dentro do Provider.
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// 3. CRIANDO O COMPONENTE PROVIDER
// Este componente irá gerenciar o estado dos favoritos e fornecer os
// valores para todos os componentes filhos.
interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  // O estado que armazena a lista de favoritos.
  // Tipamos explicitamente o estado como um array de DataItem.
  const [favorites, setFavorites] = useState<Tarefa[]>([]);

  const toggleFavorite = (item: Tarefa) => {
    // Verificamos se o item já está na lista de favoritos pelo seu ID.
    const isAlreadyFavorite = favorites.some(fav => fav.id === item.id);

    if (isAlreadyFavorite) {
      // Se já for favorito, removemos da lista.
      setFavorites(currentFavorites =>
        currentFavorites.filter(fav => fav.id !== item.id)
      );
    } else {
      // Se não for, adicionamos à lista.
      setFavorites(currentFavorites => [...currentFavorites, item]);
    }
  };

  // O valor que será compartilhado com os consumidores do contexto.
  const value = { favorites, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 4. CRIANDO UM HOOK CUSTOMIZADO (MELHOR PRÁTICA)
// Este hook simplifica o uso do nosso contexto e adiciona uma
// verificação de segurança para garantir que ele só seja usado
// dentro de um FavoritesProvider.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}