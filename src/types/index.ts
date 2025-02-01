import { z } from "zod";
import { CategoriesResponseSchema, DrinkResponse, DrinksResponse, RecipeResponseSchema, SearchFilterSchema } from "../utils/recipes-schema";


export type Categories = z.infer<typeof CategoriesResponseSchema>;

export type SearchFilter = z.infer<typeof SearchFilterSchema>;

export type Drinks = z.infer<typeof DrinksResponse>;

export type Drink = z.infer<typeof DrinkResponse>;

export type Recipe = z.infer<typeof RecipeResponseSchema>;

export type Notification = {
    text: string;
    error: boolean;
    show: boolean;
}