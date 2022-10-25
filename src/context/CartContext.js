import { createContext, useState, useMemo } from 'react';

export const CartContext = createContext({
  orders: [],
  setOrders: () => {},
});