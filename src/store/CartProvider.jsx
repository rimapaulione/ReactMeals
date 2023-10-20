import React, { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "CHECK") {
    return {
      items: action.cartItems.items,
      totalAmount: action.cartItems.totalAmount,
    };
  }
  if (action.type === "ADD") {
    let updateItems;
    const updateTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const prevStateItems = [...state.items];

    for (const item of prevStateItems) {
      if (item.id === action.item.id) {
        item.amount += action.item.amount;
        updateItems = prevStateItems;
        return {
          items: updateItems,
          totalAmount: updateTotalAmount,
        };
      }
    }
    updateItems = state.items.concat(action.item);
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const updateItem = state.items.find((item) => item.id === action.id);
    const updateTotalAmount = state.totalAmount - updateItem.price;
    let updateItems;
    if (updateItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }
    if (updateItem.amount > 1) {
      updateItems = [...state.items];

      for (const item of updateItems) {
        if (item.id === action.id) {
          item.amount = item.amount - 1;
          return {
            items: updateItems,
            totalAmount: updateTotalAmount,
          };
        }
      }
    }
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = ({ children }) => {
  const [cartState, cartDispach] = useReducer(cartReducer, defaultCartState);

  useEffect(() => {
    const cartStr = localStorage.getItem("cart");
    const cart = JSON.parse(cartStr);
    checkItemsToCartHandler(cart);
  }, []);

  const checkItemsToCartHandler = (cartItems) =>
    cartDispach({ type: "CHECK", cartItems: cartItems });

  const addItemToCartHandler = (item) => {
    cartDispach({ type: "ADD", item: item });
  };

  const removeItemFromCartHAndler = (id) => {
    cartDispach({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    cartDispach({ type: "CLEAR" });
  };

  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const providerValue = {
    items: cartState.items,
    checkItems: checkItemsToCartHandler,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHAndler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={providerValue}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
