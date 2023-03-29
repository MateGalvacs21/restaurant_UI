import { DrinkItemDTO } from "./drink-item.model";
import { Afa } from './coin.model';

export type DrinkGroupDTO = {
  items: DrinkItemDTO[] | [];
  nameoftype: string;
  afa: Afa;
};
