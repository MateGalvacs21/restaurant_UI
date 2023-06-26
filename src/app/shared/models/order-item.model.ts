import { Afa } from './coin.model';

export type OrderItemDTO = {
  name: string;
  nickname: string;
  price: number;
  afa: Afa;
  items: string[];
  itemsOriginalCount: number;
  extraItems: string[];
  removedItems: string[];
  type: string;
};
