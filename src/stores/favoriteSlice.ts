import { StateCreator } from "zustand";
import { Recipe } from "../types"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { createNotificacionSlice, NotificationSliceType } from "./notificationSlice";


export type FavoritesSliceType = {
    favorites: Recipe[];
    handleFavorite: (recipe: Recipe) => void;
    favoriteExist: (id: Recipe['idDrink']) => boolean;
    loadFromStorage: () => void;
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleFavorite: (recipe) => {

        if(get().favoriteExist(recipe.idDrink))
        {
            // Elimina el favorito selecionado
            set( (state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }));
            
            createNotificacionSlice(set, get, api).showNotification({
                text: 'Se Eliminó de Favoritos',
                error: false
            });
        }
        else
        {
            // Agregrega la rececta seleccionada -- ambos metodos hacen lo mismo
            //set({ favorites: [...get().favorites, recipe] });
            set( (state) =>({ favorites: [...state.favorites, recipe] }));

            createNotificacionSlice(set, get, api).showNotification({
                text: 'Se Agregó a Favoritos',
                error: false
            });
        }

        createRecipesSlice(set, get, api).closeModal();

        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id);
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');

        if(storedFavorites)
        {
            set({ favorites: JSON.parse(storedFavorites) });
        }
    }
});


// Slice Pattern
