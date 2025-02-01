import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export default function Header() {

  const [filters, setFilters] = useState({
    ingredient: '',
    category: ''
  });
  
  const { pathname } = useLocation();

  const isHome = useMemo( () => pathname === '/', [pathname]);

  const fetchCategories = useAppStore( (state) => state.fetchCategories);
  const categories = useAppStore( (state) => state.categories);
  const searchRecipies = useAppStore( (state) => state.searchRecipies);
  const showNotification = useAppStore( (state) => state.showNotification);

  useEffect( () => {
    fetchCategories();
  },[]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: validar
    if(Object.values(filters).includes(''))
    {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    // consultar las recetas
    searchRecipies(filters);
  }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover': 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                  <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>
                <nav className="flex gap-5">
                  <NavLink to="/" className={ ({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
                  <NavLink to="/favoritos" className={ ({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                </nav>
            </div>
            {isHome && (
              <form className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-32 p-10 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>

                <div className="space-y-4">
                  <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Nombre o Ingredientes</label>
                  <input type="text" name="ingredient" id="ingredient" onChange={handleChange} value={filters.ingredient}
                  className="p-3 w-full rounded-lg focus:outline-none bg-white" placeholder="Nombre o Ingrediente Ej. Tequila, Café, Vodka"/>
                </div>

                <div className="space-y-4">
                  <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Categoria</label>
                  <select name="category" id="category" className="p-3 w-full rounded-lg focus:outline-none bg-white" onChange={handleChange} value={filters.category}>
                    <option value="" >-- Seleccione --</option>
                    {categories.drinks.map(category => (
                      <option value={category.strCategory} key={category.strCategory}>{category.strCategory}</option>
                    ))}
                  </select>
                </div>

                <input type="submit" value="Buscar Recetas" className="cursor-pointer bg-orange-700 hover:bg-orange-900 text-white font-extrabold w-full p-2 uppercase rounded-lg" />
              </form>
            )}
        </div>
    </header>
  )
}
