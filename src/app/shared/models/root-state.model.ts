import { RestaurantDTO } from "./restaurant.model";
import { Statistics } from "./order.model";

export type RootState = {
  restaurant: RestaurantDTO | null,
  statistics: Statistics[] | null
}
