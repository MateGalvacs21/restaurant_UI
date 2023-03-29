import { Afa } from './coin.model';

export type MenuDTO = {
  id: string;
  name: string;
  nickname: string;
  items: string[] | [];
  price: number;
  type: string;
  afa: Afa;
};
