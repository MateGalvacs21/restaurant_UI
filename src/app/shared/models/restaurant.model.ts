import { DrinkGroupDTO } from './drink-group.model';
import { MenuDTO } from './menu.model';

export type RestaurantDTO = PostRestaurant & DeleteRestaurant;

export type EditDrinksRestaurant = {
  drinks: DrinkGroupDTO[];
};
export type EditMenuRestaurant = {
  menu: MenuDTO[];
};
export type PostRestaurant = EditDrinksRestaurant & EditMenuRestaurant;
export type DeleteRestaurant = {
  id: string;
};
