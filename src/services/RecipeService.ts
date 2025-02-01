
import axios from "axios";
import { CategoriesResponseSchema, DrinksResponse, RecipeResponseSchema } from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";


export async function getCategories() {
    
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const { data } = await axios(url);

    const result = CategoriesResponseSchema.safeParse(data);
    
    if(result.success)
    {
        return result.data;
    }
}

export async function getRecipies(filter: SearchFilter)
{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`;

    const { data } = await axios(url);

    const result = DrinksResponse.safeParse(data);

    if(result.success)
    {
        return result.data;
    }
}

export async function getRecipeById(id: Drink['idDrink']) {
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const { data } = await axios(url);

    const result = RecipeResponseSchema.safeParse(data.drinks[0]);

    if(result.success)
    {
        return result.data;
    }
    
}