import { OrderItemDTO } from './order-item.model';

export type PostOrder = {
  table: string;
  restaurantId: string;
  items: OrderItemDTO[];
  amount: number;
};

export type OrderDTO = PostOrder & {
  id: string;
  afa27: number;
  afa5: number;
  date: string;
};

export type PatchOrder = {
  id: string;
  items: OrderItemDTO[];
  amount: number;
};

export type Statistics = OrderDTO & {card: string}
