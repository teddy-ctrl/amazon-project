import { Type } from "./action.type";

// --- START: MODIFICATION FOR CART PERSISTENCE ---

// 1. A function to safely get the initial basket from localStorage.
// This runs when the app first loads.
const getInitialBasket = () => {
  try {
    const savedBasket = localStorage.getItem("basket");
    // If a saved basket exists, parse it, otherwise return an empty array.
    return savedBasket ? JSON.parse(savedBasket) : [];
  } catch (error) {
    console.error("Failed to parse basket from localStorage", error);
    return []; // Return an empty basket if there's an error
  }
};

// 2. The initial state now loads the basket from our function.
export const initialState = {
  basket: getInitialBasket(),
  user: null,
};

// --- END: MODIFICATION FOR CART PERSISTENCE ---

export const reducer = (state, action) => {
  let newBasket; // Holds the updated basket state

  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        newBasket = [...state.basket, { ...action.item, amount: 1 }];
      } else {
        newBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // Save the updated basket to localStorage
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      // Save the updated basket to localStorage
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };

    case Type.EMPTY_BASKET:
      // Also clear the basket from localStorage
      localStorage.removeItem("basket");
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};